module.exports = {
    env: {
        browser: true,
        es6: true
    },
    extends: 'eslint:recommended',
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
                allow: ['error']
            }
        ],
        'one-var-declaration-per-line': [2, 'always'],
        'new-cap': 2
    },
    globals: {
        applyCode: true,
        CodeMirror: true,
        console: true,
        cmInitContent: true,
        cmSelectChStart: true,
        cmSelectLine: true,
        mceUtils: true,
        Prism: true,
        require: true,
        site: true
    }
};
