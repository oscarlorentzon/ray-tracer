module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: [
        '@typescript-eslint',
        'jest'
    ],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:jest/recommended'
    ],
    rules: {
        '@typescript-eslint/no-this-alias': [
            'error',
            {
                'allowDestructuring': false,
                'allowedNames': ['self'],
            },
        ],
    },
};
