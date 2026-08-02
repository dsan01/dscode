import type { APIRoute } from 'astro'

import { generateSitemap } from '@lib/sitemap'
import type { BlogType, ProjectType, SitemapUrl } from '@data/data'
import fetchApi from '@lib/strapi'

export const GET: APIRoute = async ({ site }) => {
  const baseUrl = site!.toString()

    const staticPages = [
    '',
    'projects',
    'blog',
    'contact',
    'about',
  ]

  const staticUrl:SitemapUrl[] = staticPages.flatMap(path => [
    {
      loc: `${baseUrl}${path}`,
      changefreq: 'never',
    },
    {
      loc: `${baseUrl}en/${path === '/' ? '' : path}`,
      changefreq: 'never',
    },
  ])

  const es_projects = await fetchApi<Partial<ProjectType[]>>({
    endpoint: "projects",
    query: {
      fields: ["slug", "updatedAt"],
    },
    wrappedByKey: "data",
    lang: "es",
  });

  const en_projects = await fetchApi<Partial<ProjectType[]>>({
    endpoint: "projects",
    query: {
      fields: ["slug", "updatedAt"],
    },
    wrappedByKey: "data",
    lang: "en",
  });

  const es_blogs = await fetchApi<Partial<BlogType[]>>({
    endpoint: "blogs",
    query: {
      fields: ["slug", "updatedAt"],
    },
    wrappedByKey: "data",
    lang: "es",
  });

  const en_blogs = await fetchApi<Partial<BlogType[]>>({
    endpoint: "blogs",
    query: {
      fields: ["slug", "updatedAt"],
    },
    wrappedByKey: "data",
    lang: "en",
  });

  const dinamycUrl:SitemapUrl[]  = [

    ...es_projects.map(project => ({
      loc: `${baseUrl}projects/${project?.slug}`,
      lastmod: project?.updatedAt.toISOString().split('T')[0],
    })),

    ...en_projects.map(project => ({
      loc: `${baseUrl}en/projects/${project?.slug}`,
      lastmod: project?.updatedAt.toISOString().split('T')[0],
    })),

    ...es_blogs.map(blog => ({
      loc: `${baseUrl}blog/${blog?.slug}`,
      lastmod: blog?.updatedAt.toISOString().split('T')[0],
    })),
        
    ...en_blogs.map(blog => ({
      loc: `${baseUrl}en/blog/${blog?.slug}`,
      lastmod: blog?.updatedAt.toISOString().split('T')[0],
    })),

  ]

  return new Response(generateSitemap([...staticUrl, ...dinamycUrl]), {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}