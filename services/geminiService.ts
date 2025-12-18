
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const withRetry = async <T>(fn: () => Promise<T>, retries = 3, delay = 1000): Promise<T> => {
  try {
    return await fn();
  } catch (error: any) {
    if (retries > 0 && (error.status === 429 || error.status >= 500)) {
      await new Promise(resolve => setTimeout(resolve, delay));
      return withRetry(fn, retries - 1, delay * 2);
    }
    throw error;
  }
};

/**
 * 获取流式回复，提供更好的交互体验
 */
export async function* getGeminiStream(prompt: string, language: string) {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const responseStream = await ai.models.generateContentStream({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: `You are an expert AI assistant for "Kaixiang's AI Toolkit" (康凯翔的 AI 实用工具箱). 
        Current language: ${language}. Keep responses concise, helpful, and professional. 
        Focus on how these specific tools (RefMatch, Japanese News Summarizer, Particle Distribution, Oogiri AI) serve educational and creative purposes.`,
        temperature: 0.7,
      },
    });

    for await (const chunk of responseStream) {
      const c = chunk as GenerateContentResponse;
      yield c.text || "";
    }
  } catch (error) {
    console.error("Gemini Stream Error:", error);
    yield "Error communicating with Gemini.";
  }
}

export const getGeminiResponse = async (prompt: string, language: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    // Fix: Explicitly specify GenerateContentResponse to avoid 'unknown' type error
    const response = await withRetry<GenerateContentResponse>(() => ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: `You are an expert AI assistant for "Kaixiang's AI Toolkit". 
        Current language: ${language}.`,
        temperature: 0.7,
      },
    }));
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error communicating with Gemini.";
  }
};

export interface NewsItem {
  title: string;
  url: string;
  summary: string;
  sourceLabel: string;
  date?: string;
}

export const fetchLatestHENews = async (language: string): Promise<NewsItem[]> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = `Find 3 most recent and relevant news headlines specifically for Higher Education Research or University Management from 'University World News'. 
    Language: ${language}.`;
    
    // Fix: Explicitly specify GenerateContentResponse to avoid 'unknown' type error
    const response = await withRetry<GenerateContentResponse>(() => ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        temperature: 0.2,
      },
    }));

    // Fix: Successfully access candidates and text from GenerateContentResponse
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    const searchUrls = groundingChunks?.map((c: any) => c.web?.uri).filter(Boolean) || [];
    const text = response.text || "";
    
    const sections = text.split(/\d\.\s+|\n\s*[*#-]\s+/).filter(s => s.trim().length > 30);
    
    const items: NewsItem[] = [];
    for (let i = 0; i < Math.min(sections.length, 3); i++) {
      const section = sections[i];
      const lines = section.split('\n').map(l => l.trim()).filter(l => l.length > 0);
      
      const title = lines[0] || "Research Insight";
      const summary = lines.slice(1).join(' ').replace(searchUrls[i] || '', '').trim();

      items.push({
        title: title.length > 150 ? title.substring(0, 150) + '...' : title,
        summary: summary || (language === 'zh' ? '点击查看更多详情。' : 'Click to read more.'),
        url: searchUrls[i] || "#",
        sourceLabel: "University World News",
        date: new Date().toLocaleDateString(language === 'zh' ? 'zh-CN' : 'en-US', { month: 'short', day: 'numeric' })
      });
    }

    return items;
  } catch (error) {
    console.error("News Fetch Error:", error);
    return [];
  }
};
