/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  corePlugins: {
    // The rest of the site uses its own hand-written CSS (assets/css/style.css).
    // Tailwind's Preflight reset would clobber that globally (margins, headings,
    // buttons, etc. on every page), so it's turned off here — we only want the
    // utility classes (flex, px-4, rounded-md, ...) that the /quote page uses.
    preflight: false,
  },
  theme: {
    extend: {},
  },
  plugins: [],
};
