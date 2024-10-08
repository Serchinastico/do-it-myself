const { color } = require("@app/core/theme/color");
const plugin = require("tailwindcss/plugin");

module.exports = {
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        ".body": "text-body font-normal",
        ".button": "text-button font-semibold",
        ".caption": "text-caption font-light",
        ".center": "items-center justify-center",
        ".contain": { resizeMode: "contain" },
        ".cover": { resizeMode: "cover" },
        ".error": "text-error text-button font-semibold",
        ".fill": "top-0 right-0 bottom-0 left-0",
        ".h1": "text-h1 font-black",
        ".h2": "text-h2 font-bold",
        ".h3": "text-h3 font-bold",
        ".min-h-press": "min-h-[44px]",
        ".min-size-press": "min-h-[44px] min-w-[44px]",
        ".min-w-press": "min-w-[44px]",
        ".size-press": "h-[44px] w-[44px]",
      });
    }),
  ],
  theme: {
    borderRadius: {
      card: "32px",
      full: "999px",
    },
    colors: { ...color },
    fontSize: {
      body: "16px",
      button: "16px",
      caption: "16px",
      h1: "34px",
      h2: "28px",
      h3: "20px",
    },
  },
};
