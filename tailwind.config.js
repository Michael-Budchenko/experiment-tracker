/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      xxl: { max: '104.9988em' },
      xl: { max: '89.9988em' },
      lg: { max: '79.9988em' },
      lgs: { max: '63.9988em' },
      mdl: { max: '61.9988em' },
      md: { max: '47.9988em' },
      sml: { max: '35.9363em' },
      sm: { max: '29.9988em' },
      anyHover: { raw: '(any-hover: hover)' },
    },
    fontFamily: {
      SpaceGroteskMedium: ['SpaceGroteskMedium'],
      SpaceGroteskBold: ['SpaceGroteskBold'],
      SpaceGroteskSemiBold: ['SpaceGroteskSemiBold'],
      SpaceGroteskRegular: ['SpaceGroteskRegular'],
      StaatlichesRegular: ['StaatlichesRegular'],
    },
    extend: {
      colors: {
        mainColor: '#9B9A99',
      },
      borderRadius: {},

      animation: {
        fadeIn: 'fade-in 0.3s ease 1',
      },
    },
  },
  plugins: [],
};
