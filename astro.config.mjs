// astro.config.mjs
import react from '@astrojs/react';
import sitemap from "@astrojs/sitemap";
import solid from "@astrojs/solid-js";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel";
import robotsTxt from "astro-robots-txt";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: import.meta.env.DEV
    ? "http://localhost:4321"
    : "https://lunaria-studio.vercel.app",

  output: "server",
  adapter: vercel({ runtime: "edge" }),

  integrations: [
    tailwind(),
    sitemap(),
    robotsTxt(),
    solid({ include: ["./src/components/**/*.{tsx,jsx}"] }),
    react({ include: ["./src/components/**/*.{tsx,jsx}"] }),
  ],

  vite: {
    define: {
      // Exponer SOLO las contraseñas al cliente (necesario para SolidJS)
      "import.meta.env.DASHBOARD_PASSWORD": JSON.stringify(process.env.DASHBOARD_PASSWORD),
      "import.meta.env.ELMOHIKANO_PASSWORD": JSON.stringify(process.env.ELMOHIKANO_PASSWORD),
    },
    envPrefix: ['PUBLIC_', 'DASHBOARD_', 'ELMOHIKANO_'], // Permite ambas
  },

  image: {}
});