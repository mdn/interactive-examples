module.exports = {
    env: {
        browser: true,
        es6: true,
        jest: true,
        node: true
    },
    extends: 'eslint:recommended',
    parserOptions: {
        ecmaVersion: 8
    },
    rules: {
        'no-global-assign': 2,
        indent: [2, 4],
        'linebreak-style': [2, 'unix'],
        quotes: [2, 'single'],
        semi: [2, 'always'],
        curly: [2, 'all'],
        camelcase: [
            2,
            {
                properties: 'always'
            }
        ],
        eqeqeq: [2, 'smart'],
        'no-console': [
            'error',
            {
                allow: ['log', 'error']
            }
        ],
        'one-var-declaration-per-line': [2, 'always'],
        'new-cap': 2
    },
    globals: {
        Clipboard: true,
        CodeMirror: true,
        console: true,
        expect: true,
        exports: true,
        getShadowRoot: true,
        module: true,
        page: true,
        Prism: true,
        require: true,
        ShadyCSS: true,
        ShadyDOM: true,
        test: true
    }
};
