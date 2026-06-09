/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        kid: {
          red: "#FF6B6B",
          orange: "#FFA726",
          yellow: "#FFEE58",
          green: "#66BB6A",
          blue: "#42A5F5",
          purple: "#AB47BC",
          pink: "#EC407A",
          cyan: "#26C6DA",
        },
      },
      fontFamily: {
        kid: ["Comic Neue", "cursive"],
      },
      animation: {
        bounce_slow: "bounce 2s infinite",
        wiggle: "wiggle 1s ease-in-out infinite",
        pop: "pop 0.3s ease-out",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        pop: {
          "0%": { transform: "scale(0.8)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
