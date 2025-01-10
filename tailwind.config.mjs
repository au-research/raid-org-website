/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        raidPrimary: "#368bcc",
        raidSecondary: "#87b5cf",
        raidGray: "#e7e6ea",
        raidTextPrimary: "#4b86b1",
        raidTextPrimaryDark: "#43789f",
        raidTextPrimaryDarker: "#3c6b8d",
      },
    },
  },
  plugins: [],
};
