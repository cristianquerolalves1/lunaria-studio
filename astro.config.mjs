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

  output: "server", // necesario para tus APIs
  adapter: vercel({ runtime: "edge" }), // o serverless

  integrations: [
    tailwind(),
    sitemap(),
    robotsTxt(),
    solid({ include: ["./src/components/**/*.{tsx,jsx}"] }),
    react({ include: ["./src/components/**/*.{tsx,jsx}"] }),
  ],

  image: {}, // configuración mínima válida para Astro
});
