/**  @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      spacing: {
        1: "1px",
        10: "10px",
        12: "12px",
        15: "15px",
        40: "40px",
        100: "100px",
        200: "200px",
        600: "600px",
        1000: "1000px",
      },
      width: {},
      height: {},
      margin: {},
      flex: {
        2: 2,
      },
      lineHeight: {
        100: "100px",
        200: "200px",
      },
    },
  },
  plugins: [],
};
