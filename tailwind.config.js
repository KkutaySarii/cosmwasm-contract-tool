/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "main-gradient": "linear-gradient(90deg, #4A1C85 0%, #35A4FD 101.68%)",
        "background-gradient":
          "linear-gradient(180.35deg, #3850A5 0.85%, #8C239D 37.69%, rgba(20, 73, 102, 0.8625) 97.12%)",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
