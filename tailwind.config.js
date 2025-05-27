import { LL_COLOR, LL_HEIGHT, LL_WIDTH } from './src/constants/ui';

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
        sm: '14px',
        mid: '18px',
        title: '24px',
        smbold: ['14px', { fontWeight: '700' }],
        exsm: '12px',
      },
      letterSpacing: {
        tightest: '-0.05em',
      },
      lineHeight: {
        40: '40px',
      },
      spacing: {
        card: LL_HEIGHT.card,
      },
      maxWidth: {
        container: LL_WIDTH.container,
        button: LL_WIDTH.button,
      },

      keyframes: {
        typing: {
          '0%': { width: '0%', visibility: 'hidden' },
          '100%': { width: '100%' },
        },
        blink: {
          '0%, 100%': { borderColor: 'transparent' },
          '50%': { borderColor: '#A0AEC0' },
        },
      },
      animation: {
        typing: 'typing 2s steps(25), blink',
        blink: 'blink 0.75s step-end infinite',
      },
    },
  },
  plugins: [],
};
