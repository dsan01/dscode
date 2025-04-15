import type { TrajectoryColection } from "src/types/data";
import { TrajectoryType } from "src/types/enums";

export const Trajectories: TrajectoryColection[] = [
  {
    lang: "es",
    Trajectories: [
      {
        Title: "Desarrollador Junior",
        Company: "SIESA",
        StartDate: new Date("2022-12-5"),
        EndDate: new Date("2025-2-28"),
        Image: "/img/logos/SIESA_logo.jpg",
        Successes: [
          "Desarrollador web full-stack con enfasis en tecnologias frontend con Blazor y backend con C# y .NET",
        ],
        Type: TrajectoryType.Experience,
      },
      {
        Title: "Web Designer",
        Company: "CAAV",
        StartDate: new Date("2022-7-1"),
        EndDate: new Date("2022-9-1"),
        Image: "/img/logos/CAAV_logo.jpg",
        Successes: [
          "Diseñador y desarrollador de la página web empresarial de la compañía, así como del portal de empleos, utilizando tecnologías como React, Firebase, Node, entre otras.",
        ],
        Type: TrajectoryType.Experience,
      },
      {
        Title: "Desarrollador Fullstack",
        Company: "Kuepa Edu Tech",
        StartDate: new Date("2025-3-3"),
        Image: "/img/logos/KUEPA_logo.jpg",
        Successes: [
          "Desarrollador web full-stack con enfasis en tecnologias frontend con Blazor y backend con C#",
        ],
        Type: TrajectoryType.Experience,
      },

      {
        Title: "Ingeniero informático",
        Company: "Universidad Autónoma de Occidente",
        StartDate: new Date("2019-1-1"),
        EndDate: new Date("2023-12-1"),
        Image: "/img/logos/UAO_logo.jpeg",
        Type: TrajectoryType.Studies,
      },
      {
        Title: "Especialista en gerencia de proyectos",
        Company: "Universidad Autónoma de Occidente",
        StartDate: new Date("2023-7-1"),
        EndDate: new Date("2024-12-1"),
        Image: "/img/logos/UAO_logo.jpeg",
        Type: TrajectoryType.Studies,
      },
    ],
  },
  {
    lang: "en",
    Trajectories: [
      {
        Title: "Junior Developer",
        Company: "SIESA",
        StartDate: new Date("2022-12-5"),
        EndDate: new Date("2025-2-28"),
        Image: "/img/logos/SIESA_logo.jpg",
        Successes: [
          "Full-stack web developer with emphasis on frontend technologies with Blazor and backend with C# and .NET.",
        ],
        Type: TrajectoryType.Experience,
      },
      {
        Title: "Web Designer",
        Company: "CAAV",
        StartDate: new Date("2022-7-1"),
        EndDate: new Date("2022-9-1"),
        Image: "/img/logos/CAAV_logo.jpg",
        Successes: [
          "Designer and developer of the company's corporate website, as well as the career portal, using technologies like React, Firebase, Node, and others.",
        ],
        Type: TrajectoryType.Experience,
      },
      {
        Title: "Desarrollador Fullstack",
        Company: "Kuepa Edu Tech",
        StartDate: new Date("2025-3-3"),
        Image: "/img/logos/KUEPA_logo.jpg",
        Successes: [
          "Desarrollador web full-stack con enfasis en tecnologias frontend con Blazor y backend con C#",
        ],
        Type: TrajectoryType.Experience,
      },

      {
        Title: "Informatics engineer",
        Company: "Universidad Autónoma de Occidente",
        StartDate: new Date("2019-1-1"),
        EndDate: new Date("2023-12-1"),
        Image: "/img/logos/UAO_logo.jpeg",
        Type: TrajectoryType.Studies,
      },
      {
        Title: "Project Management Specialist",
        Company: "Universidad Autónoma de Occidente",
        StartDate: new Date("2023-7-1"),
        EndDate: new Date("2024-12-1"),
        Image: "/img/logos/UAO_logo.jpeg",
        Type: TrajectoryType.Studies,
      },
    ],
  },
];
