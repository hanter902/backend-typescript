module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": 12
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "rules": {
        "semi": ["error", "always"],
        "quotes": ["error", "double"],
        "eqeqeq": 1,
        "no-console": "warn", // "warn" // "off"
        "curly": "error",
    },
    "include": [
        "src/**/*.ts"
    ],
    "exclude": [
      "node_modules"
    ]
};
