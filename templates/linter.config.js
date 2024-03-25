module.exports = {
    env: {
        node: true,
        commonjs: true,
        es2021: true,
        mocha: true,
    },
    extends: [ "eslint:recommended", "plugin:node/recommended" ],
    parserOptions: {
        ecmaVersion: "latest",
    },
    rules: {
        indent: [ "error", 4 ],
        quotes: [ "error", "double" ],
        semi: [ "error", "always" ],
        "no-unused-vars": [
            "error",
            {
                varsIgnorePattern: "should|expect|supertest|assert",
            },
        ],
        curly: [ "error", "all" ],
        "brace-style": [ "error", "allman" ],
        "node/no-unpublished-require": [
            "error",
            {
                allowModules: [ "swagger-ui-express" ],
            },
        ],
        "node/no-missing-require": "off",
    },
};
