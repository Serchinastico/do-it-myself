/** @type {import('@lingui/conf').LinguiConfig} */
export const locales = ["en", "es"];
export const catalogs = [
  {
    path: "<rootDir>/src/locales/{locale}/messages",
    include: ["src"],
  },
];
export const format = "po";
