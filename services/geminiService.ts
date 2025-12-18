
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY || "";

export const getGeminiResponse = async (prompt: string, language: string) => {
  if (!API_KEY) return "API Key not configured. (请配置 API Key)";
  
  try {
    const ai = new GoogleGenAI({ apiKey: API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: `You are an expert AI assistant for "Kaixiang's AI Toolkit" (康凯翔的 AI 实用工具箱), a collection of projects by researcher Kaixiang Kang. 
        Current language: ${language}. Keep responses concise, helpful, and professional. 
        Focus on how these specific tools (RefMatch, Japanese News Summarizer, Particle Distribution, Oogiri AI) serve educational and creative purposes.`,
        temperature: 0.7,
      },
    });
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
  if (!API_KEY) return [];
  
  try {
    const ai = new GoogleGenAI({ apiKey: API_KEY });
    // Requested information in a structured way to help parsing
    const prompt = `Find 3 most recent and relevant news headlines specifically for Higher Education Research or University Management from 'University World News'. 
    For each news item, provide:
    1. Title
    2. A 2-sentence descriptive summary of the findings or the news content.
    3. The direct URL.
    
    Language of the response: ${language}.`;
    
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        temperature: 0.2,
      },
    });

    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    const text = response.text || "";
    
    // We attempt to pair the grounded URLs with the textual content.
    // Since parsing unstructured text can be tricky, we'll try a regex approach or line split.
    const searchUrls = groundingChunks?.map((c: any) => c.web?.uri).filter(Boolean) || [];
    
    // Better parsing strategy: Split by common bullet points or numbering
    const sections = text.split(/\d\.\s+|\n\s*[*#-]\s+/).filter(s => s.trim().length > 30);
    
    const items: NewsItem[] = [];
    for (let i = 0; i < Math.min(sections.length, 3); i++) {
      const section = sections[i];
      const lines = section.split('\n').map(l => l.trim()).filter(l => l.length > 0);
      
      const title = lines[0] || "Research Insight";
      const summary = lines.slice(1).join(' ').replace(searchUrls[i] || '', '').trim();

      items.push({
        title: title.length > 150 ? title.substring(0, 150) + '...' : title,
        summary: summary || (language === 'zh' ? '点击查看更多高教研究详情。' : 'Click to read more details about this research.'),
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
