module.exports = {
  purge: ['./src/**/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  mode: 'jit',
  //   theme: {
  //     extend: {},
  //   },
  //   variants: {
  //     extend: {},
  //   },
  plugins: [require('tailwind-scrollbar')],
};
