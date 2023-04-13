/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lucidean: "#1e4d91",
        cornell: "#A8201A",
        rose: "#B9314F",
        cordovan: "#8C2F39",
        "old-rose": "#CC7E85",
        seasalt: "#FAFAFA",
        jet: "#020100",
      },
      animation: {
        "gradient-animate": "bg-animate 45s ease infinite",
      },
      keyframes: {
        "bg-animate": {
          "0%, 100%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" },
        },
      },
      backgroundSize: {
        animated: "400% 400%",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
});
