module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'trybe': '#036b52',
        'lightgreen': '#2fc18c'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}