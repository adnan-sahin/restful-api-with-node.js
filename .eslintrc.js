module.exports = {
    "extends": "airbnb-base",
    rules: {
        "comma-dangle": 0,
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'linebreak-style': 0,
    },
    "env": { "node": true, "mocha": true }
};