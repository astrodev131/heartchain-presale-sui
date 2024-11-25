const { Height } = require("@mui/icons-material");

function range(start, end, increment = 1) {
  const count = Math.floor((end - start + increment) / increment);
  return Array(count)
    .fill(0)
    .map((_, idx) => start + idx * increment);
}

const minFontSize = 5;
const maxFontSize = 80;

const minSpacingPixel = 0;
const maxSpacingPixel = 800;
const spacingPixelIncrement = 1;
const parmas = [minSpacingPixel, maxSpacingPixel, spacingPixelIncrement];

const vhs = [
  "10vh",
  "20vh",
  "30vh",
  "40vh",
  "50vh",
  "60vh",
  "70vh",
  "80vh",
  "90vh",
  "100vh",
];
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    screens: {
      sx: "350px",
      sm: "640px",
      md: "768px",
      mm: "920px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",

      mobile: "992px",
      laptop: "1024px",
      desktop: "1280px",
    },

    extend: {
      colors: {
        bg: "#090721",
        text: "#5F70A0",
        white: "#ffffff",
        primary: "#5137EE",
        foreground: "#232358",
        modalBg: "#17143A",
        tbBg: "#17143A",
        thColor: "#5F70A0",
      },

      fontSize: {
        ...range(minFontSize, maxFontSize).reduce(
          (merged, f) => ({ ...merged, [f]: `${f}px !important` }),
          {}
        ),
      },

      spacing: {
        ...range(...parmas).reduce(
          (merged, f) => ({ ...merged, [f]: `${f}px !important` }),
          {}
        ),
      },
      maxWidth: {
        ...range(...parmas).reduce(
          (merged, f) => ({ ...merged, [f]: `${f}px !important` }),
          {}
        ),
      },
      minWidth: {
        ...range(...parmas).reduce(
          (merged, f) => ({ ...merged, [f]: `${f}px !important` }),
          {}
        ),
      },
      maxHeight: {
        ...range(...parmas).reduce(
          (merged, f) => ({ ...merged, [f]: `${f}px !important` }),
          {}
        ),

        ...vhs.reduce((merged, vh) => ({ ...merged, [vh]: vh }), {}),
      },
      minHeight: {
        ...range(...parmas).reduce(
          (merged, f) => ({ ...merged, [f]: `${f}px !important` }),
          {}
        ),

        ...vhs.reduce((merged, vh) => ({ ...merged, [vh]: vh }), {}),
      },
    },
  },

  plugins: [],
};
