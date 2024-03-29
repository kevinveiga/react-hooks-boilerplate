const Dotenv = require('dotenv-webpack');

module.exports = {
    devServer: {
        // allowedHosts: ['http://api.devserver/'],
        compress: true,
        // headers: {
        //     'Access-Control-Allow-Credentials': 'false',
        //     'Access-Control-Allow-Origin': 'http://api.liberta.devserver/'
        // },
        historyApiFallback: true,
        host: 'localhost', // Para ver em outros dispositivos na mesma rede, mudar para ip local ex: 192.168.1.60
        hot: true,
        https: false,
        index: 'index.html',
        lazy: false,
        liveReload: false,
        open: true,
        port: 3000,
        // public: 'localhost:3000',
        publicPath: '/',
        // proxy: {
        // '*': commonPaths.outputPath
        //     '/api/v1': {
        //         target: 'https://api.liberta.devserver',
        //         secure: false
        //     }
        // },
        staticOptions: {
            redirect: false
        },
        stats: {
            cached: false
        },
        watchContentBase: false
    },
    devtool: 'source-map',
    mode: 'development',
    plugins: [
        new Dotenv({
            path: './.env.development'
        })
    ]
};
