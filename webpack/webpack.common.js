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
                test: /\.(gif|jpg|png|webp)$/,
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
                                quality: 65
                            },
                            optipng: {
                                enabled: false
                            },
                            outputPath: commonPaths.imagesFolder,
                            pngquant: {
                                quality: '65-75',
                                speed: 4
                            },
                            webp: {
                                quality: 75
                            }
                        }
                    }
                ]
            },
            {
                exclude: /(node_modules)/,
                test: /\.(eot|ttf|woff|woff2)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: commonPaths.fontsFolder
                        }
                    }
                ]
            }
        ]
    },
    output: {
        chunkFilename: devMode ? `${commonPaths.jsFolder}/[name].js` : `${commonPaths.jsFolder}/[name].[chunkhash].js`,
        filename: devMode ? `${commonPaths.jsFolder}/[name].js` : `${commonPaths.jsFolder}/[name].[hash].js`,
        path: commonPaths.outputPath,
        publicPath: '/'
    },
    performance: {
        assetFilter: (assetFilename) => {
            // Function predicate that provides asset filenames
            return assetFilename.endsWith('.js');
        },
        hints: 'warning', // enum
        maxAssetSize: 300000, // int (in bytes),
        maxEntrypointSize: 500000 // int (in bytes)
    },
    plugins: [
        new InjectManifest({
            importsDirectory: 'asset',
            include: [/(.css)$/, /(.eot)$/, /(.gif)$/, /(.jpg)$/, /(.js)$/, /(.png)$/, /(.svg)$/, /(.ttf)$/, /(.webp)/, /(.woff)$/, /(.woff2)$/],
            swDest: `${commonPaths.outputPath}/sw.js`,
            swSrc: `${commonPaths.srcPath}/sw.js`,
            templatedURLs: {
                '/manifest.json': '[manifestHash]'
            }
        }),
        new HtmlWebpackPlugin({
            minify: true,
            template: commonPaths.templatePath
        }),
        new ScriptExtHtmlWebpackPlugin({
            defaultAttribute: 'async'
        }),
        new Webpack.ProgressPlugin()
    ],
    resolve: {
        extensions: ['*', '.js'],
        modules: ['src', 'node_modules']
    },
    target: 'web'
};
