module.exports = function getBabelConfiguration(api) {
    api.cache(true);

    const plugins = ['babel-plugin-styled-components'];

    const presets = [
        [
            '@babel/preset-env',
            {
                corejs: { version: '3' },
                loose: true,
                modules: false,
                targets: {
                    browsers: ['last 2 versions'],
                    esmodules: true
                },
                useBuiltIns: 'entry'
            }
        ],
        '@babel/preset-react'
    ];

    return {
        plugins,
        presets
    };
};
