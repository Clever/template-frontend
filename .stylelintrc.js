module.exports = {
  extends: [
    // https://prettier.io/docs/en/integrating-with-linters.html#recommended-configuration-2
    "stylelint-prettier/recommended",
  ],
  rules: {
    "block-no-empty": null,
    "color-no-invalid-hex": true,
    "declaration-property-value-whitelist": {
      "/color/": [
        "transparent",
        "/@accent_aqua/",
        "/@accent_pink/",
        "/@accent_purple/",
        "/@alert_green/",
        "/@alert_orange/",
        "/@alert_red/",
        "/@neutral_black/",
        "/@neutral_dark_gray/",
        "/@neutral_gray/",
        "/@neutral_medium_gray/",
        "/@neutral_off_white/",
        "/@neutral_silver/",
        "/@neutral_white/",
        "/@primary_blue/",
      ],
    },
    "max-nesting-depth": [1, { ignoreAtRules: ["media"] }],
    "no-descending-specificity": true,
    "no-duplicate-selectors": true,
    "selector-max-id": 0,
    "unit-whitelist": ["em", "ms", "rem", "s", "vh", "%"],
  },
};
