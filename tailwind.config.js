/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        lolBlue: "#123456", // Exemple de couleur bleue, à ajuster selon votre préférence
        lolGold: "#F1C40F", // Couleur or
        lolDark: "#34495E", // Couleur sombre
      },
      fontFamily: {
        sans: ["Mulish", "sans-serif"], // Définit Mulish comme la police par défaut
      },
    },
  },
  plugins: [],
};
