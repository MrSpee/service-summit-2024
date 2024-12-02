import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'christmas-red': '#C41E3A',
        'christmas-green': '#165B33',
        'christmas-gold': '#FFD700',
        'snow-white': '#FFFAFA',
        'pine-green': '#2C5545',
        'cranberry': '#BB0A21',
      },
      backgroundImage: {
        'christmas-pattern': "url('/christmas-pattern.png')",
      },
    },
  },
  plugins: [],
}

export default config

