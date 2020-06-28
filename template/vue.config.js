const path = require('path');

module.exports = {
  lintOnSave: false,

  devServer: {
    disableHostCheck: true,
  },

  publicPath: process.env.publicPath || './',
  productionSourceMap: false,

  css: {
    extract: false,
    loaderOptions: {
      postcss: {
        plugins: [
          // eslint-disable-next-line global-require
          require('postcss-pxtorem')({ // 把px单位换算成rem单位
            rootValue: 100, // 换算的基数(设计图750的根字体为32)
            selectorBlackList: ['van-'], // 忽略转换正则匹配项
            propList: ['*'],
          }),
        ],
      },
    },
  },

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.resolve(__dirname, './src/main.less'),
      ],
    },
  },
};
