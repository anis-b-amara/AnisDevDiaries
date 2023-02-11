/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['src/components/**/*.tsx', 'src/pages/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        primary: '#8A4CAE',
        secondary: '#E2A055',
      },
    },
  },
};
