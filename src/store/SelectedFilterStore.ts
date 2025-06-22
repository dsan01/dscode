import { atom } from "nanostores";
import { CategoryFilterType } from "@data/enums";

export const selectedFilter = atom<CategoryFilterType>(CategoryFilterType.All);
