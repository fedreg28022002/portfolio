/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography';
import { defineConfig } from "tailwindcss";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {},
    },
  },
  plugins: [typography],
};
