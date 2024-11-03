/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}', // Include all relevant file types
    './index.html',
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            color: '#333',
            a: {
              color: '#3182ce',
              '&:hover': {
                color: '#2c5282',
              },
            },
            h1: {
              color: '#2c3e50', // Example for header color
            },
            h2: {
              color: '#34495e', // Example for subheader color
            },
            // Add more styles for other elements as needed
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    // Add other plugins here if needed
  ],
}
