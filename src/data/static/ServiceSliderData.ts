import type { SliderType } from "@data/data";
import { FoundationType } from "@data/enums";

const basePattern: SliderType[] = [
  {
    icon: FoundationType.Develop,
    text: "service.develop",
  },
  {
    icon: FoundationType.Desing,
    text: "service.desing",
  },
  {
    icon: FoundationType.Managment,
    text: "service.managment",
  },
];

export const ServiceSlider: SliderType[] = Array.from(
  { length: 5 },
  () => basePattern,
).flat();
