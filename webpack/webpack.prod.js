const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const Webpack = require('webpack');

const commonPaths = require('./paths');

module.exports = {
    mode: 'production',
    optimization: {
        concatenateModules: true,
        flagIncludedChunks: true,
        mangleExports: true,
        mangleWasmImports: true,
        mergeDuplicateChunks: true,
        moduleIds: 'hashed',
        namedChunks: false,
        namedModules: false,
        nodeEnv: 'production',
        occurrenceOrder: false,
        providedExports: true,
        removeAvailableModules: true,
        removeEmptyChunks: true,
        // Keep the runtime chunk seperated to enable long term caching
        // https://twitter.com/wSokra/status/969679223278505985
        runtimeChunk: 'single',
        sideEffects: true,
        // Automatically split vendor and common
        // https://twitter.com/wSokra/status/969633336732905474
        // https://medium.com/webpack/webpack-4-code-splitting-chunk-graph-and-the-splitchunks-optimization-be739a861366
        splitChunks: {
            automaticNameDelimiter: '~',
            automaticNameMaxLength: 30,
            cacheGroups: {
                common: {
                    chunks: 'async',
                    enforce: true,
                    name: 'common',
                    priority: 10,
                    reuseExistingChunk: true
                },
                default: false,
                vendor: {
                    chunks: 'all',
                    name(module) {
                        const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

                        return `npm.${packageName.replace('@', '')}`;
                    },
                    priority: 20,
                    test: /[\\/]node_modules[\\/]/
                },
                vendors: false
            },
            maxAsyncRequests: Infinity,
            maxInitialRequests: Infinity,
            minChunks: 1
        },
        usedExports: true
    },
    plugins: [
        new Webpack.optimize.ModuleConcatenationPlugin(),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [`${commonPaths.assetPath}/**/*`]
        }),
        new Dotenv({
            path: './.env.production'
        })
    ]
};
