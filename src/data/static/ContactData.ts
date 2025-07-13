import type { ContactBenfitType, ContactSocialLinksType } from "@data/data";

export const Benefits: ContactBenfitType[] = [
  {
    icon: "tabler:cup",
    title: "contact.benefit.title.exploration",
    description: "contact.benefit.desc.exploration",
  },
  {
    icon: "tabler:calendar-time",
    title: "contact.benefit.title.comunication",
    description: "contact.benefit.desc.comunication",
  },
  {
    icon: "tabler:award",
    title: "contact.benefit.title.tehcnical",
    description: "contact.benefit.desc.tehcnical",
  },
  {
    icon: "tabler:tools",
    title: "contact.benefit.title.adapt",
    description: "contact.benefit.desc.adapt",
  },
];

export const contactLinks: ContactSocialLinksType[] = [
  {
    title: "Github",
    link: "https://github.com/dsan01",
    icon: "tabler:brand-github",
    description: "contact.link.github",
  },
  {
    title: "Linkedin",
    link: "https://www.linkedin.com/in/dsanchez01",
    icon: "tabler:brand-linkedin",
    description: "contact.link.linkedin",
  },
  {
    title: "CV",
    link: "#",
    icon: "tabler:certificate",
    description: "contact.link.cv",
  },
];
