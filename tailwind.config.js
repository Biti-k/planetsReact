/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      'colors': {
        'galaxy-blue': '#141414',
        'galaxy-cyan' : '#6AB2DA',
        'galaxy-gray': '#282828',
        'galaxy-white': '#f5f5f5',
        'galaxy-purple' : '#2a2989',
        'galaxy-violet' : '#94339C',
        'galaxy-deep' : '#29122d',
        'bg' : '#94339c'
      },
    },
  },
  plugins: [],
}

