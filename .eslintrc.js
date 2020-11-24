module.exports = {
  env: {
    browser: true,
    es2021: true,
    "jest/globals": true,
    node: true,
  },
  extends: ["plugin:react/recommended", "airbnb"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "jest"],
  rules: {
    "react/jsx-filename-extension": 0,
    quotes: [2, "double", { avoidEscape: true }],
    "operator-linebreak": [
      "error",
      "after",
      { overrides: { "?": "ignore", ":": "ignore" } },
    ],
    "implicit-arrow-linebreak": 0,
    "import/no-useless-path-segments": 0,
    "no-plusplus": ["error", { allowForLoopAfterthoughts: true }],
    "no-confusing-arrow": 0,
    "function-paren-newline": 0,
    "object-curly-newline": 0,
    "react/prop-types": 0,
    "jest/no-disabled-tests": "warn",
    "jest/no-focused-tests": "error",
    "jest/no-identical-title": "error",
    "jest/prefer-to-have-length": "warn",
    "jest/valid-expect": "error",
    "global-require": 0,
    "no-restricted-syntax": 0,
    "jsx-a11y/mouse-events-have-key-events": 0,
    "jsx-a11y/click-events-have-key-events": 0,
    "jsx-a11y/no-static-element-interactions": 0,
    "react/jsx-props-no-spreading": 0,
    "newline-per-chained-call": ["error", { ignoreChainWithDepth: 5 }],
    "react/destructuring-assignment": 0,
    "no-underscore-dangle": 0,
    "react/require-default-props": 0,
    "consistent-return": 0,
    "react/jsx-no-bind": 0,
    "react/no-array-index-key": 0,
    "no-tabs": 0,
    "comma-dangle": [
      "error",
      {
        arrays: "always-multiline",
        objects: "always-multiline",
        imports: "only-multiline",
        exports: "always-multiline",
        functions: "never",
      },
    ],
    "import/prefer-default-export": 0,
    "no-shadow": 0,
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: true,
        optionalDependencies: true,
        peerDependencies: true,
      },
    ],
    "no-param-reassign": ["error", { props: false }],
  },
};
