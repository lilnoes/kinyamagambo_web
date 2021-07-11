module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.js", "./components/**/*.js"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        wheat: "wheat"
      },
      keyframes: {
        wiggle: {
          "0%": {opacity: 1},
          "100%": {opacity: 0},
        }
      },
      animation: {
        wiggle: "wiggle 5s linear 3"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
