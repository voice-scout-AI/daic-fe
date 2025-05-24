import { LL_COLOR } from './src/constants/ui';

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        pointGreen: LL_COLOR.pointGreen,
        subGreen: LL_COLOR.subGreen,
        whiteGreen: LL_COLOR.whiteGreen,
        subBlack: LL_COLOR.subBlack,
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
      },
      fontSize: {
        sm: '18px',
        mid: '24px',
        title: '28px',
        smbold: ['18px', { fontWeight: '700' }],
        exsm: '15px',
      },
      letterSpacing: {
        tightest: '-0.05em',
      },
      lineHeight: {
        40: '40px',
      },
      keyframes: {
        typing: {
          '0%': { width: '0%', visibility: 'hidden' },
          '100%': { width: '100%' },
        },
        blink: {},
      },
      animation: {
        typing: 'typing 2s steps(25), blink',
      },
    },
  },
  plugins: [],
};
