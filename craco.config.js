const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#29d197',
              '@btn-primary-shadow': 'unset',
              '@btn-shadow': 'unset',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
