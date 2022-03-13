module.exports = {
    root: true,
    env: {
        es6: true,
        node: true
    },
    parser: "@typescript-eslint/parser",
    parserOptions: {
        sourceType: "module",
        ecmaVersion: 2021,
        tsconfigRootDir: __dirname,
        project: ["./tsconfig.eslint.json"]
    },
    plugins: ["@typescript-eslint"],
    extends: [
        "eslint:all",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "prettier"
    ],
    rules: {
        camelcase: 0,
        "one-var": 0,
        "sort-keys": 0,
        "no-magic-numbers": 0,
        "prefer-named-capture-group": 0
    }
};
