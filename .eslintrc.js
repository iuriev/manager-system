module.exports = {
  "env": {
    "browser": true,
    "node": true
  },
  "root": true,
  "parser": "@typescript-eslint/parser",
  "plugins": [
    "@typescript-eslint"
  ],
  "rules": {
    "semi": "off",
    "@typescript-eslint/semi": [
      "warn"
    ],
    "@typescript-eslint/no-empty-interface": [
      "error",
      {
        "allowSingleExtends": true
      }
    ]
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "overrides": [
    // Next.js needs default exports for pages and API points
    {
      "files": ["pages/*", "pages/api/*"],
      "rules": {
        "import/no-default-export": "off"
      }
    }
  ]
};
