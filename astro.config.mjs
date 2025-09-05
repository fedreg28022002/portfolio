// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  vite: {
    define: {
      __DEV__: true,
    },
    plugins: [tailwindcss()],

    // Las dos siguientes lineas son para evitar errores con lightningcss
    optimizeDeps: {
      exclude: ["lightningcss"],
      include: ["@emailjs/browser"],
    },
    ssr: {
      noExternal: ["lightningcss"],
    },
  },

  integrations: [react()],
});
