/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        lolBlue: {
          1: '#CDFAFA',
          2: '#0AC8B9',
          3: '#0397AB',
          4: '#005A82',
          5: '#0A323C',
          6: '#091428',
          7: '#0A1428',
        },
        lolGold: {
          1: '#F1C40F',
          2: '#F0E6D2',
          3: '#C8AA6E',
          4: '#C89B3C',
          5: '#785A28',
          6: '#463714',
          7: '#32281E',
        },
        lolGrey: {
          1: '#A09B8C',
          1.5: '#5B5A56',
          2: '#3C3C41',
          3: '#1E2328',
          COOL: '#1E282D',
          black: '#010A13',
          navbar: "#111"
        },
      },
      fontFamily: {
        sans: ['Mulish', 'sans-serif'],
        serif: ['LTMuseum', 'serif'],
      },
    },
  },
  plugins: [],
};
