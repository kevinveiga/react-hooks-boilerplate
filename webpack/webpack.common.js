const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const Webpack = require('webpack');
const { InjectManifest } = require('workbox-webpack-plugin');

const commonPaths = require('./paths');

const devMode = process.env.NODE_ENV === 'development';

module.exports = {
    entry: commonPaths.entryPath,
    module: {
        rules: [
            {
                exclude: /(node_modules)/,
                test: /(.js)$/,
                use: [
                    {
                        loader: 'babel-loader'
                    },
                    {
                        loader: 'stylelint-custom-processor-loader',
                        options: {
                            emitWarning: devMode
                        }
                    },
                    {
                        loader: 'eslint-loader',
                        options: {
                            emitWarning: devMode
                        }
                    }
                ]
            },
            {
                exclude: /(node_modules)/,
                test: /\.(gif|jpg|png|svg|webp)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: devMode ? '[name].[ext]' : '[name][hash].[ext]',
                            outputPath: commonPaths.imagesFolder
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            gifsicle: {
                                interlaced: false
                            },
                            mozjpeg: {
                                progressive: true,
                                quality: 60
                            },
                            optipng: {
                                enabled: false
                            },
                            outputPath: commonPaths.imagesFolder,
                            pngquant: {
                                quality: [0.65, 0.8],
                                speed: 4
                            },
                            webp: {
                                quality: 70
                            }
                        }
                    }
                ]
            }
        ]
    },
    output: {
        chunkFilename: devMode ? `${commonPaths.jsFolder}/[name].js` : `${commonPaths.jsFolder}/[name].[chunkhash].js`,
        filename: devMode ? `${commonPaths.jsFolder}/[name].js` : `${commonPaths.jsFolder}/[name].[contenthash].js`,
        path: commonPaths.outputPath,
        publicPath: '/'
    },
    performance: {
        assetFilter: (assetFilename) => {
            // Function predicate that provides asset filenames
            return assetFilename.endsWith('.js');
        },
        hints: 'warning', // enum
        maxAssetSize: 300000, // int (in bytes)
        maxEntrypointSize: 500000 // int (in bytes)
    },
    plugins: [
        new InjectManifest({
            exclude: [/(.json)$/],
            include: [/(\/asset\/)(?:.+(.gif))$/, /(.html)$/, /(\/asset\/)(?:.+(.jpg))$/, /(\/asset\/)(?:.+(.js))$/, /(\/asset\/)(?:.+(.png))$/, /(\/asset\/)(?:.+(.svg))$/],
            mode: process.env.NODE_ENV,
            swDest: `${commonPaths.outputPath}/sw.js`,
            swSrc: `${commonPaths.srcPath}/sw.js`
        }),
        new HtmlWebpackPlugin({
            cache: false,
            filename: 'index.html',
            minify: true,
            template: commonPaths.templatePath
        }),
        new ScriptExtHtmlWebpackPlugin({
            inline: [/(main.*)$/, /(runtime.*)$/, /(vendor.*)$/],
            defaultAttribute: 'async',
            preload: {
                chunks: 'initial',
                test: /\.js$/
            }
        }),
        new Webpack.ProgressPlugin()
    ],
    resolve: {
        extensions: ['*', '.js'],
        modules: ['src', 'node_modules']
    },
    stats: {
        errorDetails: true,
        maxModules: Infinity,
        moduleTrace: true,
        optimizationBailout: false
    },
    target: 'web'
};
