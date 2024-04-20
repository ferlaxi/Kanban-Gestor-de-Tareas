/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "kb-morado": "#635FC7",
        "kb-morado-light": "#A8A4FF",
        "kb-black": "#000112",
        "kb-black-semi": "#20212C",
        "kb-black-medium": "#2B2C37",
        "kb-black-light": "#3E3F4E",
        "kb-gray": "#828FA3",
        "kb-gray-medium": "#E4EBFA",
        "kb-gray-light": "#F4F7FD",
        "kb-red": "#EA5555",
        "kb-red-light": "#FF9898",
        "kb-column-add": "#E9EFFA",
      },
    },
  },
  darkMode: "class",
  plugins: [require("@tailwindcss/forms")],
};
