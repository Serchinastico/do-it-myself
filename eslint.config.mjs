import { FlatCompat } from "@eslint/eslintrc";
import eslint from "@eslint/js";
import dim from "eslint-plugin-dim";
import jsonFiles from "eslint-plugin-json-files";
import perfectionist from "eslint-plugin-perfectionist";
import prettier from "eslint-plugin-prettier";
import path from "node:path";
import { fileURLToPath } from "node:url";
import tseslint from "typescript-eslint";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  allConfig: eslint.configs.all,
  baseDirectory: __dirname,
  recommendedConfig: eslint.configs.recommended,
});

const prettierConfig = compat.extends("prettier");

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...prettierConfig,
  perfectionist.configs["recommended-natural"],
  {
    ignores: [
      "node_modules/*.js",
      "android/*.js",
      "ios/*.js",
      "**/node_modules/**/*",
      "**/android/**/*",
      "**/ios/**/*",
    ],
    plugins: { dim, "json-files": jsonFiles, prettier },
    rules: {
      "@typescript-eslint/ban-types": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/no-unused-vars": "warn",
      "dim/use-custom-scroll-view": "error",
      "json-files/sort-package-json": "error",
      "no-empty": "off",
      "perfectionist/sort-exports": "off",
      "perfectionist/sort-imports": "error",
      "perfectionist/sort-modules": "off",
      "perfectionist/sort-objects": "error",
      "prettier/prettier": "error",
    },
  }
);
