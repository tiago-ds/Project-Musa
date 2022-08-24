const { guessProductionMode } = require("@ngneat/tailwind");

module.exports = {
    prefix: '',
    purge: {
      enabled: guessProductionMode(),
      content: [
        './src/**/*.{html,ts}',
      ]
    },
    darkMode: false, // or 'media' or 'class'
    theme: {
      colors: {
        transparent: 'transparent',
        white: '#FFF',
        darkpink: '#7C1A9E',
        lightpink: '#9D2CC5',
        darkpurple: '#6737F0',
        lightpurple: '#744BE9',
        vibrantblue: '#1364DD',
        coral: '#FF007A',
        bordeaux: '#861566',
        darkgray: '#1E1E1E',
        spotifygreen: '#1DB954'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['DM Sans', 'sans-serif']
      },
      zIndex: {
        '-10': '-10',
       }
    },
    variants: {
      extend: {},
    },
    plugins: [],
};
