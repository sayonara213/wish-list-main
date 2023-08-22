import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';
import colors from 'tailwindcss/colors';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    'node_modules/preline/dist/*.js',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: {
          '50': '#f1f2fc',
          '100': '#e5e9fa',
          '200': '#d0d5f5',
          '300': '#b3baee',
          '400': '#9597e4',
          '500': '#7e7bd9',
          '600': '#6e62cb',
          '700': '#5e50b2',
          '800': '#4c4390',
          '900': '#413c73',
          '950': '#272343',
        },
        accent: '#2a2b2f',
        subAccent: '#222327',
        accentLight: '#FFFFFF',
        subAccentLight: '#FFFFFF',

        border: '#38393c',
        borderLight: '#e9e9e9',

        subText: '#909193',
        subTextLight: '#8e8e91',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('preline/plugin'),
    require('tailwind-scrollbar'),
  ],
};
export default config;
