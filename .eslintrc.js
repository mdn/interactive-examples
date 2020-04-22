module.exports = {
    env: {
        browser: true,
        es6: true,
        node: true,
    },
    extends: 'eslint:recommended',
    parser: 'babel-eslint',
    parserOptions: {
        ecmaVersion: 6,
        sourceType: 'script',
    },
    rules: {
        'camelcase': [
            'error',
            {
                properties: 'always',
            },
        ],
        'curly': ['error', 'all'],
        'eqeqeq': ['error', 'smart'],
        'new-cap': 'warn',
        'no-console': [
            'error',
            {
                allow: ['log', 'error'],
            },
        ],
        'indent': ['error', 2],
        'linebreak-style': ['error', 'unix'],
        'no-control-regex': 'error',
        'no-global-assign': 'error',
        'no-prototype-builtins': 'off',
        'object-curly-spacing': ['error', 'always'],
        'one-var-declaration-per-line': ['error', 'always'],
        'quotes': ['error', 'single'],
        'semi': ['error', 'always'],
    },
    globals: {
        SharedArrayBuffer: true,
        Atomics: true,
        BigInt: true,
        getShadowRoot: true,
        globalThis: true, // will be supported in eslint 7.0
    },
};
