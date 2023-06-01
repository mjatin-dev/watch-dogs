/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        medium: "0.90rem",
        large: "1.4rem",
      },
      colors: {
        card: "#333639",
        neonGreen: "#2de93f",
        fade: "rgba(255, 255, 255, 0.1)",
        noData: "#B0B0B0",
      },
      fontFamily: {
        body: ["DM+Sans"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
