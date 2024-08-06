/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  // enable dark mode via class strategy
  darkMode: 'class',
  theme: {
    extend:{
      keyframes: {
        'show-mobile-nav': {
          "0%": {
            transform: "translateY(-100%)",   
            opacity: "0",
          },
          "100%": {
            transform: "translateY(0)",
            opacity: "1",
          }
        },
        'show-notif': {
          "0%": {
            transform: "translateX(100%)",   
          },
          "100%": {
            transform: "translateX(0)",
          }
        }
      },
      animation: {
        'show-mobile-nav': 'show-mobile-nav 0.5s linear',
        'show-notif': 'show-notif 0.5s linear'
      }
    }
  },
  plugins: [
  ],
}