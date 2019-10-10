module.exports = function getBabelConfiguration(api) {
    api.cache(true);

    const plugins = ['babel-plugin-styled-components'];

    const presets = [
        [
            '@babel/preset-env',
            {
                corejs: '3',
                targets: {
                    esmodules: true
                },
                useBuiltIns: 'usage'
            }
        ],
        '@babel/preset-react'
    ];

    return {
        plugins,
        presets
    };
};
