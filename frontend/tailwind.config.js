/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        pink:'#9a0062',
        yellow:'#9a8600',
        verde:'#009a39',
        lightblue:'#006e74',
        darkblue:'#00149a',
      },
    },
  },
  plugins: [],
};
