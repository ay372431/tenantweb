const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: './',
  lintOnSave: false,
  devServer: {
    port: 5004,
    disableHostCheck: true,
    historyApiFallback: {
      rewrites: [
        // 单段且看起来像密文（不含点 . ）的路径，重写到 /cipher.html
        { from: /^\/[A-Za-z0-9%+\-_=]+$/, to: '/cipher.html' }
      ]
    }
  },
  chainWebpack(config) {
    config.resolve.alias.set('@', path.resolve(__dirname, 'src'));
    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end();
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end();
    // ====== 关键：移除 prefetch / preload，以减少并发 chunk 请求 ======
    config.plugins.delete('prefetch');
    config.plugins.delete('preload');
  }
};
