const plugin = require("tailwindcss/plugin")

module.exports = plugin(function ({ addUtilities }) {
  addUtilities({
    ".animate-in": {
      "animation-name": "animate-in",
      "animation-duration": "150ms",
      "animation-timing-function": "cubic-bezier(0, 0, 0.2, 1)",
    },
    ".animate-out": {
      "animation-name": "animate-out",
      "animation-duration": "150ms",
      "animation-timing-function": "cubic-bezier(0, 0, 0.2, 1)",
    },
    "@keyframes animate-in": {
      from: {
        opacity: "0",
        transform:
          "translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))",
      },
      to: {
        opacity: "1",
        transform: "translate(0) rotate(0) skewX(0) skewY(0) scaleX(1) scaleY(1)",
      },
    },
    "@keyframes animate-out": {
      from: {
        opacity: "1",
        transform: "translate(0) rotate(0) skewX(0) skewY(0) scaleX(1) scaleY(1)",
      },
      to: {
        opacity: "0",
        transform:
          "translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))",
      },
    },
  })
})