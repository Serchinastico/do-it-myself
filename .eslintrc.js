module.exports = {
  ignorePatterns: ["node_modules/*.js", "android/*.js", "ios/*.js"],
  extends: [
    "universe/native",
    "prettier",
    "plugin:perfectionist/recommended-natural",
  ],
  plugins: ["prettier", "perfectionist", "json-files"],
  rules: {
    "json-files/sort-package-json": ["error"],
    "prettier/prettier": ["error"],
    "perfectionist/sort-objects": ["error"],
  },
};
