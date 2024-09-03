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
      gridTemplateColumns:{
        'auto-fill': 'repeat(auto-fill, minmax(450px, 1fr))',
      },
      backgroundImage:{
        'texture-white':"url('/public/white.jpg')",
        'texture-black':"url('/public/black.jpg')",
      },
      keyframes: {
        'show-message':{
          "0%": {
            transform: "translateY(-20%)",   
          },
          "100%": {
            transform: "translateY(0)",

          }
        },
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
        },
        'show-profile-menu': {
          '0%': {
            transform: 'scale(0)',
          },
          '100%': {
            transform: 'scale(1)',
          }
        },
        'animate-progress': {
          '0%': {
            width: '0%',
          },
          '100%': {
            width: '100%',
          }
        },
        background: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        }
      },
      animation: {
        'show-message': 'show-message 0.2s linear',
        'show-mobile-nav': 'show-mobile-nav 0.5s linear',
        'show-notif': 'show-notif 0.5s linear',
        'show-profile-menu': 'show-profile-menu 0.5s linear',
        'animate-progress': 'animate-progress 1s linear',
        'background': 'background 5s ease infinite',
      }
    }
  },
  plugins: [
  ],
}