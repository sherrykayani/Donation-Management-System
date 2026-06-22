/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["DM Sans", "system-ui", "sans-serif"],
        display: ["Outfit", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glass: "0 8px 32px rgba(0, 0, 0, 0.12)",
      },
      backgroundImage: {
        "hero-gradient":
          "linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(236,72,153,0.12) 50%, rgba(34,211,238,0.1) 100%)",
      },
    },
  },
  plugins: [],
};
