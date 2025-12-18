
export type Language = 'zh' | 'en' | 'ja';

export interface TranslationStrings {
  navTools: string;
  navNews: string;
  heroTitle: string;
  heroSub: string;
  exploreBtn: string;
  toolSectionTitle: string;
  newsSectionTitle: string;
  readMore: string;
  visitTool: string;
  aiAssistant: string;
  askAssistant: string;
  langSwitch: string;
  limitReached: string;
  contactMe: string;
  copyEmail: string;
  copied: string;
  viewProfile: string;
}

export type ToolStatus = 'Stable' | 'Beta' | 'New' | 'Dev' | 'Internal Only';

export interface AITool {
  id: string;
  icon: string;
  title: Record<Language, string>;
  description: Record<Language, string>;
  link: string;
  category: string;
  status?: ToolStatus;
  isHot?: boolean;
  isNew?: boolean;
}

export interface NewsInsight {
  id: string;
  date: string;
  title: Record<Language, string>;
  summary: Record<Language, string>;
  source: string;
}
