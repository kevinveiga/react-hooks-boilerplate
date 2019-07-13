module.exports = function getBabelConfiguration(api) {
    api.cache(true);

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
        presets
    };
};
