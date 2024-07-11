/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  darkMode:"class",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {

    extend: {
     
      colors: {
        green: "#41C981",
        textBlack: "#07121D",
        blue: "#125DAC",
        white: "#fff",
        ligthWhite: "#F4F7f9",
        red: "#C70909",
        moodGray: "#465566",
        iconColor: '#AEB3B9',
        textGray: "#81909F",
        hoverGray: "#AEB3B9",
        brGray: "#E1EAF1",
        lightGray: "#EEF3F7",
        darkGray: "#34414F",
        gray: '#ECF1F4'
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