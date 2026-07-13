// @ts-check
import { defineConfig, envField } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import icon from 'astro-icon';

import react from "@astrojs/react";

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  output: 'server',
  prefetch: true,
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [icon(), react()],

  i18n: {
    locales: ["es", "en"],
    defaultLocale: "es",
    routing: {
      prefixDefaultLocale: false,
    }
  },

  adapter: node({
    mode: "standalone"
  }),

  env: {
    schema: {
      STRAPI_URL: envField.string({ context: "client", access: "public" }),
      STRAPI_BEARER: envField.string({ context: "server", access: "secret" }),
      CAP_URL: envField.string({ context: "client", access: "public" }),
      CAP_SITE: envField.string({ context: "client", access: "public" }),
      CAP_SECRET: envField.string({ context: "server", access: "secret" }),
    }
  },

});