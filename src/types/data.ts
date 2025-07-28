import type { defaultLang, labels, languages } from "@i18n/ui";
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

export interface ProjectType extends StrapiBase {
  title: string;
  description: string;
  company: string;
  categories: string[];
  featured: boolean;
  location: string;
  slug: string;
  thumbnail: MediaType;
  finish_date: Date;
  content: string;
}

export interface ContactType {
  name: string;
  email: string;
  message: string;
}

export interface ContactBenfitType {
  icon: string;
  title: TranslationKey;
  description: TranslationKey;
}

export interface ContactSocialLinksType {
  icon: string;
  title: string;
  description: TranslationKey;
  link: string;
}

export interface SliderType {
  text: TranslationKey;
  icon: FoundationType;
}
export interface BlogType extends StrapiBase {
  title: string;
  slug: string;
  content?: string;
  description: string;

  category?: CategoryType;
  thumbnail: MediaType;
}

export interface CategoryType extends StrapiBase {
  title: string;
  slug?: string;
}

export interface MediaType extends StrapiBase {
  name: string;
  alternativeText?: string;
  caption: string;
  width: number;
  height: number;
  formats: Formats;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl?: string;
  provider: string;
  provider_metadata?: string;
}

export interface Formats {
  large?: AlterImg;
  small?: AlterImg;
  medium?: AlterImg;
  thumbnail?: AlterImg;
}

export interface AlterImg {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: null;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
}

export interface StrapiBase {
  id: number;
  documentId: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  locale?: string;
}
