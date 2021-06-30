module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.js", "./components/**/*.js"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        wheat: "wheat"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
