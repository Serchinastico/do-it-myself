import twrnc from "@app/core/theme/tailwind";

/**
 * Registers a global `tw` variable to create Tailwind styles
 */
// @ts-expect-error For some reason the d.ts file will not add tw to the global namespace
global.tw = twrnc;
