import type { defaultLang, labels, languages } from "src/i18n/ui";
import type { FoundationType, TrajectoryType } from "./enums";

type Language = keyof typeof languages;
type TranslationKey = keyof (typeof labels)[typeof defaultLang];
type TechStack = {
  title: string;
  icon: string;
};

export interface TrajectoryModel {
  title: string;
  thumbnail: any;
  successes?: string;
  company: string;
  startDate: string;
  endDate?: string;
  type: TrajectoryType;
}

export interface TrajectoryColection {
  lang: Language;
  Trajectories: TrajectoryModel[];
}

export interface ServiceInfo {
  basicTitle: TranslationKey;
  title: TranslationKey;
  subtitle: TranslationKey;
  description: TranslationKey;
  img: string;
  Foundation: FoundationType;
  tech?: TechStack[];
}

export interface ProjectType {
  id: number;
  title: string;
  description: string;
  company: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  categories: string[];
  featured: boolean;
  location: string;
  slug: string;
  locale: string;
  thumbnail: any;
  finish_date: string;
  content: string;
}
