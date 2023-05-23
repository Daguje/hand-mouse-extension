/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/pages/*.html"],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#350042",
          secondary: "#ffd5ff",
          accent: "#fbdcda",
          neutral: "#221C26",
          "base-100": "#31383F",
          info: "#7BCEEA",
          success: "#24D69D",
          warning: "#FCA64A",
          error: "#E13754",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}

