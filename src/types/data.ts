import type { TrajectoryType } from "./enums";

export interface TrajectoryModel {
  Title: string;
  Image: string;
  Successes?: string[];
  Company: string;
  StartDate: Date;
  EndDate?: Date;
  Type: TrajectoryType;
}
