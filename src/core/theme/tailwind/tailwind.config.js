const { color } = require("@app/core/theme/color");
const plugin = require("tailwindcss/plugin");

module.exports = {
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        ".center": "items-center justify-center",
        ".fill": "top-0 right-0 bottom-0 left-0",
        ".min-h-press": "min-h-[44px]",
        ".min-size-press": "min-h-[44px] min-w-[44px]",
        ".min-w-press": "min-w-[44px]",
        ".size-press": "h-[44px] w-[44px]",
      });
    }),
  ],
  theme: {
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
