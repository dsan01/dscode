import type { ServiceInfo } from "@data/data";
import { FoundationType } from "@data/enums";

export const Services: ServiceInfo[] = [
  {
    basicTitle: "service.long.develop",
    title: "service.desc.develop.title",
    subtitle: "service.desc.develop.subtitle",
    description: "service.desc.develop.description",
    img: "/img/services/develop_v2_ilustration.png",
    Foundation: FoundationType.Develop,
    tech: [
      { icon: "logos:react", title: "React (Javascript)" },
      { icon: "logos:dotnet", title: ".NET (C#)" },
      { icon: "logos:postgresql", title: "PostgreSQL" },
      { icon: "logos:astro-icon", title: "Astro (Javascript)" },
      { icon: "logos:git-icon", title: "GIT" },
    ],
  },
  {
    basicTitle: "service.long.desing",
    title: "service.desc.desing.title",
    subtitle: "service.desc.desing.subtitle",
    description: "service.desc.desing.description",
    img: "/img/services/desing_ilustration.png",
    Foundation: FoundationType.Desing,
    tech: [
      { icon: "logos:figma", title: "Figma" },
      { icon: "logos:adobe-xd", title: "Adobe XD" },
      { icon: "logos:adobe-illustrator", title: "Adobe Illustrator" },
    ],
  },
  {
    basicTitle: "service.long.managment",
    title: "service.desc.managment.title",
    subtitle: "service.desc.managment.subtitle",
    description: "service.desc.managment.description",
    img: "/img/services/managment_ilustration.png",
    Foundation: FoundationType.Managment,
    tech: [{ icon: "logos:jira", title: "Jira" }],
  },
];
