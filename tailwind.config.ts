import type { Config } from 'tailwindcss';

const config: Config = {
   content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
   darkMode: 'class',
   theme: {
      extend: {
         fontFamily: {
            sans: ['var(--font-inter)', 'sans-serif'],
            mono: ['JetBrains Mono', 'monospace'],
         },
         colors: {
            primary: { DEFAULT: '#6366f1', dark: '#4f46e5' },
            secondary: '#ec4899',
            accent: '#06b6d4',
         },
      },
   },
   plugins: [],
};

export default config;
