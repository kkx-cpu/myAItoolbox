
import { AITool, TranslationStrings } from './types';

export const TRANSLATIONS: Record<'zh' | 'en' | 'ja', TranslationStrings> = {
  zh: {
    navTools: "工具矩阵",
    navNews: "实时动态",
    heroTitle: "Kaixiang Kang",
    heroSub: "让效率归于机器，让意义归于人",
    exploreBtn: "立即探索",
    toolSectionTitle: "AI 实用工具箱",
    newsSectionTitle: "高教科研资讯",
    readMore: "阅读全文",
    visitTool: "打开工具",
    aiAssistant: "AI 助手",
    askAssistant: "我是 Kaixiang 的 AI 助手，有什么可以帮您？",
    langSwitch: "语言",
    limitReached: "您已达到今日 10 条消息的试用上限。",
    contactMe: "建立联络",
    copyEmail: "复制邮箱",
    copied: "已复制",
    viewProfile: "学术主页"
  },
  en: {
    navTools: "Toolbox",
    navNews: "Updates",
    heroTitle: "Kaixiang Kang",
    heroSub: "Machines may take efficiency, but humans must retain meaning.",
    exploreBtn: "Explore Now",
    toolSectionTitle: "AI Practical Toolkit",
    newsSectionTitle: "HE Research Insights",
    readMore: "Read Full Article",
    visitTool: "Open Tool",
    aiAssistant: "AI Assistant",
    askAssistant: "I'm Kaixiang's AI assistant, how can I help you today?",
    langSwitch: "Language",
    limitReached: "You've reached the daily trial limit of 10 messages.",
    contactMe: "Connect",
    copyEmail: "Copy Email",
    copied: "Copied!",
    viewProfile: "Research Profile"
  },
  ja: {
    navTools: "ツール箱",
    navNews: "最新ニュース",
    heroTitle: "Kaixiang Kang",
    heroSub: "機械は効率を、人間は意味を",
    exploreBtn: "今すぐ探索",
    toolSectionTitle: "AI 実用ツールボックス",
    newsSectionTitle: "高等教育研究ニュース",
    readMore: "記事を読む",
    visitTool: "ツールを開く",
    aiAssistant: "AIアシスタント",
    askAssistant: "KaixiangのAIアシスタントです。何かお手伝いしましょうか？",
    langSwitch: "言語",
    limitReached: "1日の試用制限（10メッセージ）に達しました。",
    contactMe: "コンタクト",
    copyEmail: "メールをコピー",
    copied: "コピー完了",
    viewProfile: "研究者情報"
  }
};

export const AI_TOOLS: AITool[] = [
  {
    id: "tool-refmatch",
    icon: "fa-check-double",
    category: "Academic",
    status: "Stable",
    isHot: true,
    link: "https://kkxtc-refmatchpro.hf.space",
    title: {
      zh: "RefMatch Pro 参考文献检测",
      en: "RefMatch Pro",
      ja: "RefMatch Pro：文献照合"
    },
    description: {
      zh: "智能检测论文正文引用与参考文献列表的匹配度，确保学术写作的严谨性。",
      en: "Intelligently checks the consistency between in-text citations and the reference list.",
      ja: "論文の本文引用と参考文献リストの整合性をインテリジェントにチェックします。"
    }
  },
  {
    id: "tool-nihongo",
    icon: "fa-language",
    category: "Learning",
    status: "Internal Only",
    link: "https://lab-nihongo-app.web.app/",
    title: {
      zh: "AI 日语新闻摘要平台",
      en: "Eco-Japanese News Summarizer",
      ja: "AI日本語ニュース要約平台"
    },
    description: {
      zh: "基于日语新闻的自动摘要与核心词汇提取，提升学术日语阅读与理解能力。",
      en: "Automated summarization and keyword extraction for Japanese news to enhance academic reading skills.",
      ja: "日本語ニュースの自動要約と重要単語抽出により、読解力と語彙力を向上させます。"
    }
  },
  {
    id: "tool-particle",
    icon: "fa-wave-square",
    category: "Education",
    status: "Stable",
    isNew: true,
    link: "https://distribution-edu.netlify.app",
    title: {
      zh: "手势互动粒子分布动画",
      en: "Gestural Distribution Animator",
      ja: "ジェスチャー連動・分布アニメ"
    },
    description: {
      zh: "通过手势实时控制粒子流，直观展示正态分布的统计学魅力，适用于移动端教学演示。",
      en: "Real-time gesture control of particle streams to intuitively demonstrate statistical distributions on mobile.",
      ja: "ジェスチャーで粒子を操作し、統計学的な正規分布を视覚的に体验できる教育ツール。"
    }
  },
  {
    id: "tool-oogiri",
    icon: "fa-laugh-beam",
    category: "Creative",
    status: "Beta",
    link: "https://aippon-grand-prix.vercel.app/",
    title: {
      zh: "AI 大喜利专家助手",
      en: "Oogiri AI Expert",
      ja: "AI大喜利エキスパート"
    },
    description: {
      zh: "基于生成式 AI 的创意应答工具，为您提供最具幽默感和意外性的笑点反馈。",
      en: "A creative AI tool that provides humorous and unexpected answers for Oogiri-style challenges.",
      ja: "生成AIを活用し、ユーモアと意外性に富んだ回答を生成する大喜利アシスタント。"
    }
  }
];
