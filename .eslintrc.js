const {lintConfigPaths, addTypeScript} = require('@deshaw/djs-dev-tools-all');

module.exports = addTypeScript({
    extends: [lintConfigPaths.node, lintConfigPaths.browser],
    root: true,
    rules: {
        /* Disabling eslint no-param-reassign rule for immer's draft state and redux-toolkit reducer's state.
           While using immer, changes are made to draft state without affecting the original object
           The reducer in redux-toolkit uses immer to mutate the state object
        */
        'no-param-reassign': ['error', {props: true, ignorePropertyModificationsFor: ['draft', 'state']}],
    },
    overrides: [
        {
            files: ['*rc.js'],
            rules: {
                'import/no-extraneous-dependencies': 0,
            },
        },
    ],
});
