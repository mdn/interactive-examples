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
        'brace-style': ['error', '1tbs', { 'allowSingleLine': true }],
        'camelcase': [
            'error',
            {
                properties: 'always',
            },
        ],
        'comma-spacing': 'error',
        'comma-style': 'error',
        'curly': ['error', 'all'],
        'eol-last': 'error',
        'eqeqeq': ['error', 'smart'],
        'func-call-spacing': 'error',
        'new-cap': 'warn',
        'no-array-constructor': 'error',
        'no-console': [
            'error',
            {
                allow: ['log', 'error'],
            },
        ],
        'no-new-object': 'error',
        'indent': [
            'error',
            2,
            {
                'SwitchCase': 1,
            }
        ],
        'key-spacing': 'error',
        'keyword-spacing': 'error',
        'linebreak-style': ['error', 'unix'],
        'no-control-regex': 'error',
        'no-else-return': 'error',
        'no-global-assign': 'error',
        'no-multiple-empty-lines': 'error',
        'no-prototype-builtins': 'off',
        'no-trailing-spaces': 'error',
        'no-var': 'error',
        'object-curly-spacing': ['error', 'always'],
        'one-var-declaration-per-line': ['error', 'always'],
        'prefer-arrow-callback': 'error',
        'prefer-const': 'error',
        'prefer-template': 'error',
        'quotes': ['error', 'single'],
        'semi': ['error', 'always'],
        'space-before-function-paren': ['error', 'never'],
        'space-infix-ops': 'error',
    },
    globals: {
        SharedArrayBuffer: true,
        Atomics: true,
        BigInt: true,
        getShadowRoot: true,
        globalThis: true, // will be supported in eslint 7.0
    },
    overrides: [
        {
            files: ['**/arraybuffer/arraybuffer-isview.js'],
            rules: {
                'no-unused-vars': 'off',
            },
        },
        {
            files: ['**/expressions/expressions-addition.js'],
            rules: {
                'prefer-template': 'off',
            },
        },
        {
            files: ['**/expressions/expressions-destructuringassignment.js'],
            rules: {
                'one-var-declaration-per-line': 'off',
                'prefer-const': 'off',
            },
        },
        {
            files: ['**/expressions/expressions-equality.js'],
            rules: {
                'eqeqeq': 'off',
            },
        },
        {
            files: ['**/expressions/expressions-inequality.js'],
            rules: {
                'eqeqeq': 'off',
            },
        },
        {
            files: ['**/expressions/expressions-newtarget.js'],
            rules: {
                'new-cap': 'off',
            },
        },
        {
            files: ['**/expressions/expressions-operatorprecedence.js'],
            rules: {
                'no-unused-vars': 'off',
            },
        },
        {
            files: ['**/expressions/expressions-voidoperator.js'],
            rules: {
                'no-undef': 'off',
            },
        },
        {
            files: ['**/function/function-length.js'],
            rules: {
                'no-unused-vars': 'off',
            },
        },
        {
            files: ['**/functions/functions-arguments.js'],
            rules: {
                'no-unused-vars': 'off',
            },
        },
        {
            files: ['**/map/map-prototype-foreach.js'],
            rules: {
                'no-unused-vars': 'off',
            },
        },
        {
            files: ['**/object/object-prototype-isprototypeof.js'],
            rules: {
                'new-cap': 'off',
            },
        },
        {
            files: ['**/promise/promise-all.js'],
            rules: {
                'no-unused-vars': 'off',
            },
        },
        {
            files: ['**/promise/promise-catch.js'],
            rules: {
                'no-unused-vars': 'off',
            },
        },
        {
            files: ['**/promise/promise-constructor.js'],
            rules: {
                'no-unused-vars': 'off',
            },
        },
        {
            files: ['**/promise/promise-race.js'],
            rules: {
                'no-unused-vars': 'off',
            },
        },
        {
            files: ['**/promise/promise-reject.js'],
            rules: {
                'no-unused-vars': 'off',
            },
        },
        {
            files: ['**/promise/promise-then.js'],
            rules: {
                'no-unused-vars': 'off',
            },
        },
        {
            files: ['**/proxyhandler/proxyhandler-construct.js'],
            rules: {
                'new-cap': 'off',
            },
        },
        {
            files: ['**/proxyhandler/proxyhandler-defineproperty.js'],
            rules: {
                'no-unused-vars': 'off',
            },
        },
        {
            files: ['**/proxyhandler/proxyhandler-get.js'],
            rules: {
                'no-unused-vars': 'off',
            },
        },
        {
            files: ['**/proxyhandler/proxyhandler-getprototypeof.js'],
            rules: {
                'no-unused-vars': 'off',
            },
        },
        {
            files: ['**/proxyhandler/proxyhandler-setprototypeof.js'],
            rules: {
                'no-unused-vars': 'off',
            },
        },
        {
            files: ['**/reflect/reflect-construct.js'],
            rules: {
                'new-cap': 'off',
            },
        },
        {
            files: ['**/regexp/regexp-prototype-source.js'],
            rules: {
                'no-control-regex': 'off',
            },
        },
        {
            files: ['**/regexp/regexp-prototype-tostring.js'],
            rules: {
                'no-control-regex': 'off',
            },
        },
        {
            files: ['**/set/set-prototype-foreach.js'],
            rules: {
                'no-unused-vars': 'off',
            },
        },
        {
            files: ['**/statement/statement-block.js'],
            rules: {
                'no-constant-condition': 'off',
                'no-redeclare': 'off',
                'no-unused-vars': 'off',
                'no-var': 'off',
                'prefer-const': 'off',
            },
        },
        {
            files: ['**/statement/statement-const.js'],
            rules: {
                'no-const-assign': 'off',
            },
        },
        {
            files: ['**/statement/statement-empty.js'],
            rules: {
                'curly': 'off',
            },
        },
        {
            files: ['**/statement/statement-let.js'],
            rules: {
                'prefer-const': 'off',
            },
        },
        {
            files: ['**/statement/statement-trycatch.js'],
            rules: {
                'no-undef': 'off',
            },
        },
        {
            files: ['**/statement/statement-var.js'],
            rules: {
                'no-redeclare': 'off',
                'no-var': 'off',
            },
        },
        {
            files: ['**/symbol/symbol-unscopables.js'],
            rules: {
                'no-with': 'off',
                'no-undef': 'off',
            },
        },
        {
            files: ['**/typedarray/typedarray-every.js'],
            rules: {
                'no-unused-vars': 'off',
            },
        },
        {
            files: ['**/typedarray/typedarray-filter.js'],
            rules: {
                'no-unused-vars': 'off',
            },
        },
        {
            files: ['**/typedarray/typedarray-find.js'],
            rules: {
                'no-unused-vars': 'off',
            },
        },
        {
            files: ['**/typedarray/typedarray-findindex.js'],
            rules: {
                'no-unused-vars': 'off',
            },
        },
        {
            files: ['**/typedarray/typedarray-some.js'],
            rules: {
                'no-unused-vars': 'off',
            },
        },
    ],
};
