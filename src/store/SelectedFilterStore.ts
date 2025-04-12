import { atom } from "nanostores";
import { CategoryFilterType } from "src/types/enums";

export const selectedFilter = atom<CategoryFilterType>(CategoryFilterType.All);
