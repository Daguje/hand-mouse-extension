module.exports = {
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint"],
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ],
  "env": {
    "browser": true,
    "node": true,
    "commonjs": true,
  },
  "rules": {
    "no-restricted-syntax": [
      "warn",
      {
        "message": "Please don't use chrome! Use browser instead. (https://github.com/mozilla/webextension-polyfill)",
        "selector": "MemberExpression > Identifier[name='chrome']"
      }
    ],
    "@typescript-eslint/no-var-requires": 0
  }
}
