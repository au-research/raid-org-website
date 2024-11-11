// @ts-check
import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: "https://weidenhaus-ardc.github.io/raid-org-website/",
  // base: "/raid-org-website/",
  integrations: [tailwind()],
});
