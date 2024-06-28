/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  darkMode: "class",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {

    extend: {

      colors: {
        green: "#41C981",
        textBlack: "#1D2049",
        textWhite: "#fff",
        gray: '#e9e9e9'
      },
      

      screens: {
        minMobil: "310px",
        // => @media (min-width: 320px) { ... }

        mobil: "425px",
        // => @media (min-width: 425px) { ... }

        tablet: "700px",
        tabletIst: "1000px",
        // => @media (min-width: 640px) { ... }

        laptop: "1024px",
        // => @media (min-width: 1024px) { ... }

        desktop: "1280px",
        // => @media (min-width: 1280px) { ... }
        fullHd: "1440px",
      },

    },
    plugins: [],
  }
}