/** @type {import('tailwindcss').Config} */
// Dizayn tokenlari: New-Star-School-Dashboard-Hujjatlari/03-Design-Tokens.md
// MUHIM: mavjud UI buzilmasligi uchun faqat TO'QNASHMAYDIGAN yangi kalitlar
// qo'shildi (Tailwind standart sm/md/lg radius·shadow·fontSize'lari override
// QILINMADI — ular tokens.css da CSS-var sifatida mavjud). Mavjud rang nomlari
// (darkGray, textBlack, blue, ...) komponentlar ishlatadi — SAQLANADI.
module.exports = {
  mode: "jit",
  darkMode: "class",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // --- Mavjud (o'zgarmagan) ---
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
        gray: '#ECF1F4',

        // --- Hujjat tokenlari (yangi, additiv) ---
        navy: {
          900: "#263039", 700: "#2C3A48", 500: "#34414F",
          300: "#475667", 100: "#81909F",
        },
        brand: {
          green: "#41C981", greenDark: "#34B870", greenLight: "#E7F8EF",
          blue: "#125DAC", blueDark: "#0E4C8F", blueLight: "#C3D6EA",
        },
        accent: {
          teal: "#088395", coral: "#E88D67", blue: "#2A629A",
          sea: "#58A399", purple: "#81689D", gold: "#BCA37F",
        },
        amber: { 500: "#E8A23C" },
      },

      // Yangi kalitlar — standart Tailwind utilitalariga tegmaydi
      fontFamily: {
        base: ["Inter", "Poppins", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 2px 8px rgba(38,48,57,.06)",
        modal: "0 16px 48px rgba(38,48,57,.18)",
      },
      transitionDuration: {
        fast: "150ms", base: "220ms", slow: "350ms",
      },
      transitionTimingFunction: {
        standard: "cubic-bezier(.4,0,.2,1)",
        out: "cubic-bezier(0,0,.2,1)",
      },
      zIndex: {
        sticky: "100", dropdown: "200", overlay: "900",
        modal: "1000", toast: "1100",
      },

      screens: {
        minMobil: "310px",
        mobil: "425px",
        tablet: "700px",
        tabletIst: "1000px",
        laptop: "1024px",
        desktop: "1280px",
        fullHd: "1440px",
      },
    },
    plugins: [],
  }
}
