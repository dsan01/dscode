import type { defaultLang, labels } from "src/i18n/ui";
import type { TrajectoryModel } from "./data";
import type { FoundationType } from "./enums";

type TranslationKey = keyof (typeof labels)[typeof defaultLang];

export interface ButtonGroupProps<T> {
  Selected: T;
  onClick: (item: T) => void;
  items: T[];
  resources?: ButtonResources<T>[];
}

export interface ButtonResources<T> {
  resource: string;
  type: T;
}

export interface BasicTranslateComponentProps {
  url: URL;
}

export interface TrajectoryCardProps {
  trajectory: TrajectoryModel;
  url: URL;
}

export interface StackSelectorProps {
  text: TranslationKey;
  isSelected: boolean;
  url: URL;
}

export interface ContactBannerProps {
  title?: TranslationKey;
  description?: TranslationKey;
  showDesc?: boolean;
}

export interface ProjectCardProps {
  title: string;
  description: string;
  company: string;
  pubDate?: Date;
  categories: FoundationType[];
  url: string;
  id: string;
}

export interface CategoryFoundationProps {
  category: FoundationType;
}

export interface FoundationProps {
  Foundation: FoundationType;
  ClassSize?: string;
  ClassColor?: string;
}

export interface PageTitleProps {
  title: TranslationKey;
  description?: TranslationKey;
}
