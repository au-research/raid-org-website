// @ts-check
import { defineConfig } from "astro/config";
import { loadEnv } from "vite";

const { BASE_SLUG } = loadEnv(process.env.BASE_SLUG || "", process.cwd(), "");
const { BASE_SITE } = loadEnv(process.env.BASE_SITE || "", process.cwd(), "");

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: BASE_SITE,
  base: BASE_SLUG,
  integrations: [tailwind()],
  output: "static",
  build: {
    format: "file", // This ensures 404.html is generated
  },
});
