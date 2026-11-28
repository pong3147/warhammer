import { defineConfig } from "astro/config";
import react from "@astrojs/react";

export default defineConfig({
  site: "https://pong3147.github.io",
  base: "/warhammer",
  compressHTML: true,
  integrations: [react()],
  build: {
    assets: "_astro"
  },
  vite: {
    build: {
      chunkSizeWarningLimit: 3200
    }
  }
});
