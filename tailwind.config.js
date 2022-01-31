module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "map-background": "url('./images/nasa-map.jpg')",
      },
      colors: {
        blue: {
          500: "#009de0",
        },
      },
    },
  },
  plugins: [
    require('tailwindcss-textshadow')
  ],
};
