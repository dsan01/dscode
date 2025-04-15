import type { languages } from "src/i18n/ui";
import type { TrajectoryType } from "./enums";

type Language = keyof typeof languages;

export interface TrajectoryModel {
  Title: string;
  Image: string;
  Successes?: string[];
  Company: string;
  StartDate: Date;
  EndDate?: Date;
  Type: TrajectoryType;
}

export interface TrajectoryColection {
  lang: Language;
  Trajectories: TrajectoryModel[];
}
