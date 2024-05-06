module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {
      browsers: ["last 1 version", "not dead", "ie >= 11"],
      ignoreAtRules: ["at-rule-name"],
    },
  },
};
