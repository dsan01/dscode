import type { defaultLang, labels } from "@i18n/ui";
import type {
  ContactBenfitType,
  ContactSocialLinksType,
  ProjectType,
  ServiceInfo,
  TrajectoryModel,
} from "./data";
import type { CategoryFilterType, FoundationType } from "./enums";
import type {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import type { VariantProps } from "class-variance-authority";
import type { buttonVariants } from "@primitives/Button";

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

export interface ProjectBasicProps {
  project: ProjectType;
}

export interface ProjectCardProps {
  project: ProjectType;
  url: URL;
}

export interface CategoryFoundationProps {
  category: string;
  url: URL;
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
  img?: string;
}

export interface ModalProps {
  id: string;
  title?: TranslationKey;
  showCloseButton: boolean;
  showDefaultHeader: boolean;
  showDefaultFooter: boolean;
}

export interface ProjectServiceProps {
  Service: ServiceInfo;
}

export interface ProjectContentProps {
  content: string;
}

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  variant?: "default" | "outlined";
  ref: string;
  isLoading?: boolean;
}

export interface ProjectCategoryFilterProp {
  url: URL;
  category: CategoryFilterType;
  isActive: boolean;
  onClick: (category: CategoryFilterType) => void;
}

export interface LayoutMetaProps {
  title?: TranslationKey | string;
  description?: TranslationKey | string;
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  placeholder: string;
  errors?: boolean;
  errorMessage?: string;
  ref: string;
}

export interface TextboxProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label: string;
  placeholder: string;
  errors?: boolean;
  errorMessage?: string;
  ref: string;
}

export interface BenefitsContactCardProps {
  benefit: ContactBenfitType;
}

export interface ContactLinkCardProps {
  link: ContactSocialLinksType;
}
