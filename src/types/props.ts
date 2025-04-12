import type { defaultLang, labels } from "src/i18n/ui";
import type { TrajectoryModel } from "./data";
import type { CategoryFilterType, FoundationType } from "./enums";
import type { CollectionEntry } from "astro:content";

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
  project: CollectionEntry<"projects">;
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

export interface CategoryFilterFoundationProps {
  category: CategoryFilterType;
}

export interface ServiceCardProps {
  FoundationCategory: FoundationType;
  title: TranslationKey;
  description: TranslationKey;
}
