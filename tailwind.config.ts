import type { Config } from "tailwindcss";
import defaultTheme from 'tailwindcss/defaultTheme';

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {screens: {
    'xs': '380px',  // Define the 'xs' screen with a width of 380px
    ...defaultTheme.screens,  // Preserve other screen sizes
  },},
  plugins: [],
};
export default config;
