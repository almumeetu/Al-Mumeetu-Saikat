import type { Config } from 'tailwindcss';

const config: Config = {
   content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
   darkMode: 'class',
   theme: {
      extend: {
         fontFamily: {
            sans: ['Inter', '"Noto Sans Bengali"', '"Hind Siliguri"', 'system-ui', 'sans-serif'],
            mono: ['JetBrains Mono', 'monospace'],
         },
         fontWeight: {
            thin: '100',
            extralight: '200',
            light: '300',
            normal: '400',
            medium: '500',
            semibold: '500',
            bold: '500',
            extrabold: '500',
            black: '500',
         },
         colors: {
            primary: {
               DEFAULT: '#047857',
               hover: '#065f46',
               dark: '#10b981',
               50: '#ecfdf5',
               100: '#d1fae5',
               200: '#a7f3d0',
               600: '#059669',
               700: '#047857',
               800: '#065f46',
               900: '#064e3b',
            },
            secondary: {
               DEFAULT: '#0f172a',
               light: '#334155',
            },
            accent: {
               DEFAULT: '#0d9488',
               light: '#14b8a6',
            },
         },
      },
   },
   plugins: [],
};

export default config;
