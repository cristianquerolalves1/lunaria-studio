import react from '@astrojs/react';
import sitemap from "@astrojs/sitemap";
import solid from "@astrojs/solid-js";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel";
import robotsTxt from "astro-robots-txt";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: import.meta.env.DEV
    ? "http://localhost:4321"
    : "https://lunaria-studio.vercel.app",
    
  // Config para sitio estático
  output: "static",

  // Adapter Vercel
  adapter: vercel(),

  // Integraciones
  integrations: [
    tailwind(),
    sitemap(),
    robotsTxt(),
    solid(),
    react(),
  ],
});
