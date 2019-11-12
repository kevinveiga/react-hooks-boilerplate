const Dotenv = require('dotenv-webpack');

const commonPaths = require('./paths');

module.exports = {
    devServer: {
        // allowedHosts: ['http://api.devserver/'],
        contentBase: commonPaths.outputPath,
        compress: true,
        // headers: {
        //     'Access-Control-Allow-Credentials': 'false',
        //     'Access-Control-Allow-Origin': '*'
        // },
        historyApiFallback: true,
        host: 'localhost', // Para ver em outros dispositivos na mesma rede, mudar para ip local ex: 192.168.1.60
        hot: true,
        index: 'index.html',
        open: true,
        port: 3000
        // proxy: {
        //     '/api/v1': {
        //         target: 'https://api.devserver',
        //         secure: false
        //     }
        // }
    },
    devtool: 'cheap-module-eval-source-map',
    mode: 'development',
    plugins: [
        new Dotenv({
            path: './.env.development'
        })
    ]
};
