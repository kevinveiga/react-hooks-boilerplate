const { merge } = require('webpack-merge');

const common = require('./webpack/webpack.common');

const envs = {
    development: 'dev',
    staging: 'stage',
    production: 'prod'
};

/* eslint-disable global-require, import/no-dynamic-require */
const env = envs[process.env.NODE_ENV || 'development'];
const envConfig = require(`./webpack/webpack.${env}.js`);
/* eslint-enable global-require, import/no-dynamic-require */

module.exports = merge(common, envConfig);
