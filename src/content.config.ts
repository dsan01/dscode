import { defineCollection, z } from "astro:content";

import { glob } from "astro/loaders";
import { FoundationType } from "./types/enums";

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/data/project" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    company: z.string(),
    pubDate: z.string().transform((str) => new Date(str)),
    categories: z.array(z.nativeEnum(FoundationType)),
    featured: z.boolean().optional().default(false),
    location: z.string(),
    technologies: z.array(z.string()),
  }),
});

const blogs = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/data/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    author: z.string(),
    pubDate: z.string().transform((str) => new Date(str)),
    categories: z.array(z.nativeEnum(FoundationType)),
  }),
});

export const collections = { projects };
