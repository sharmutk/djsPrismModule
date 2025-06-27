const path = require('path');
const {AutoVersionPlugin, HtmlWebpackPlugin, HtmlWebpackHarddiskPlugin} = require('@deshaw/djs-dev-tools-all');
const {standards} = require('@deshaw/djs-utils');

// Libraries that we have a CDN dependencies we want to inject into our index.html
const cdnDependencies = ['@deshaw/djs-styles'];

const autoVersionPlugin = new AutoVersionPlugin({dependencies: cdnDependencies});

module.exports = {
    // Webpack's default behavior is to bundle all assets within javascript files
    //
    // We extract css files out to prevent a flash of unstyled content in production environment
    extractCSS: standards.isProdLike(),

    // Refer webpack configuration documentation here:
    // https://webpack.js.org/concepts/
    //
    // Any valid webpack configuration options can be passed under the config key
    config: {
        // Our primary entry file.
        entry: path.resolve('src/client/index.js'),
        plugins: [
            // This plugin facilitates an HTML template which will include specified assets
            new HtmlWebpackPlugin({
                title: 'Your basic full stack djs app',
                hash: false,
                excludeChunks: ['main'],
                templateContent: autoVersionPlugin.getHTML(),
                filename: path.resolve('views', 'generated-head.html'),
                inject: 'body',
                alwaysWriteToDisk: true,
            }),
            new HtmlWebpackHarddiskPlugin(),
        ],
    },
};
