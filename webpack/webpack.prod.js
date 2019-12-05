const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const TerserPlugin = require('terser-webpack-plugin');

const commonPaths = require('./paths');

module.exports = {
    mode: 'production',
    optimization: {
        minimizer: [
            new TerserPlugin({
                // Use multi-process parallel running to improve the build speed
                // Default number of concurrent runs: os.cpus().length - 1
                cache: true,
                parallel: true,
                sourceMap: false
            })
        ],
        moduleIds: 'hashed',
        // Keep the runtime chunk seperated to enable long term caching
        // https://twitter.com/wSokra/status/969679223278505985
        runtimeChunk: 'single',
        // Automatically split vendor and commons
        // https://twitter.com/wSokra/status/969633336732905474
        // https://medium.com/webpack/webpack-4-code-splitting-chunk-graph-and-the-splitchunks-optimization-be739a861366
        splitChunks: {
            automaticNameDelimiter: '~',
            automaticNameMaxLength: 30,
            cacheGroups: {
                default: {
                    priority: -20,
                    reuseExistingChunk: true
                },
                vendor: {
                    chunks: 'initial',
                    enforce: true,
                    name: 'vendor',
                    priority: -10,
                    test: /[\\/]node_modules[\\/]/
                }
            },
            chunks: 'async',
            maxAsyncRequests: Infinity,
            maxInitialRequests: Infinity,
            minChunks: 1,
            minSize: 30000,
            name: true
        }
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [`${commonPaths.assetPath}/**/*`]
        }),
        new Dotenv({
            path: './.env.production'
        })
    ]
};
