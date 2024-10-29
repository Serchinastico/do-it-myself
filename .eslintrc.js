module.exports = {
  extends: [
    "universe/native",
    "prettier",
    "plugin:perfectionist/recommended-natural",
  ],
  ignorePatterns: ["node_modules/*.js", "android/*.js", "ios/*.js"],
  plugins: ["prettier", "perfectionist", "json-files", "dim"],
  rules: {
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/no-empty-object-type": "off",
    "dim/use-custom-scroll-view": "error",
    "json-files/sort-package-json": ["error"],
    "perfectionist/sort-objects": ["error"],
    "prettier/prettier": ["error"],
  },
};
