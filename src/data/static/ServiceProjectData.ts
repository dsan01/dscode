import type { ServiceInfo } from "@data/data";
import { FoundationType } from "@data/enums";

export const Services: ServiceInfo[] = [
  {
    basicTitle: "service.long.develop",
    title: "service.desc.develop.title",
    subtitle: "service.desc.develop.subtitle",
    description: "service.desc.develop.description",
    img: "develop_v2_ilustration.png",
    Foundation: FoundationType.Develop,
    tech: [
      { icon: "logos:react", title: "React (Javascript)" },
      { icon: "logos:dotnet", title: ".NET (C#)" },
      { icon: "logos:astro-icon", title: "Astro (Javascript)" },
      { icon: "logos:git-icon", title: "GIT" },
      { icon: "logos:nodejs-icon", title: "Node JS" },
      { icon: "logos:tailwindcss-icon", title: "Tailwind CSS" },
    ],
  },
  {
    basicTitle: "service.long.data",
    title: "service.desc.data.title",
    subtitle: "service.desc.data.subtitle",
    description: "service.desc.data.description",
    img: "data_ilustration.png",
    Foundation: FoundationType.Data,
    tech: [
      { icon: "logos:microsoft-power-bi", title: "Power BI" },
      { icon: "google-bigquery-icon", title: "Google BigQuery" },
      { icon: "logos:postgresql", title: "PostgreSQL" },
      { icon: "logos:mongodb-icon", title: "Mongo DB" },
      { icon: "sql-server-icon", title: "SQL Server" },
      { icon: "logos:redis", title: "Redis" },
      { icon: "logos:looker-icon", title: "Looker Studio" },
      { icon: "n8n-icon", title: "N8N" },
    ],
  },
  {
    basicTitle: "service.long.desing",
    title: "service.desc.desing.title",
    subtitle: "service.desc.desing.subtitle",
    description: "service.desc.desing.description",
    img: "desing_ilustration.png",
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
    img: "managment_ilustration.png",
    Foundation: FoundationType.Managment,
    tech: [
      { icon: "logos:jira", title: "Jira" },
      { icon: "pmi-icon", title: "PMI" },
    ],
  },
];
