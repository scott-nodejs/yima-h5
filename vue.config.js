/*
 * @Author: ly525
 * @Date: 2019-12-14 22:43:55
 * @LastEditors: ly525
 * @LastEditTime: 2020-10-11 11:44:14
 * @FilePath: /luban-h5/front-end/h5/vue.config.js
 * @Github: https://github.com/ly525/luban-h5
 * @Description: Do not edit
 * @Copyright 2018 - 2020 luban-h5. All Rights Reserved
 */
const path = require('path')
const webpack = require('webpack')
// const isProd = process.env.NODE_ENV === 'production'
const target = 'http://localhost:9080/oneCode'
const oss = require('./oss.config.js');
const engineOutputDir = path.join(__dirname, '../../back-end/h5-api/public/engine-assets')
const mainAppOutputDir = path.join(__dirname, '../../back-end/h5-api/build-editor')
const coreEditorOutputDir = path.join(__dirname, '../../front-end/h5/src/components/core/dist')

const CompressionWebpackPlugin = require("compression-webpack-plugin");

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

let page
switch (process.env.PAGE) {
  case 'ENGINE':
    page = {
      entry: 'src/engine-entry.js',
      outputDir: engineOutputDir
    }
    break
  case 'CORE_EDITOR':
    page = {
      entry: 'src/components/core/index.js',
      outputDir: coreEditorOutputDir
    }
    break
  case 'EDITOR':
  default:
    page = {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      title: 'Index Page',
      // outputDir: 'dist',
      outputDir: mainAppOutputDir,
      // publicPath: isProd ? '/main/' : '/'
      publicPath: process.env.NODE_ENV !== 'development' ? ('http://cdn.appshuo.club/dist/') : './',
    }
}

const configureWebpack = {
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src'),
      'core': path.join(__dirname, 'src/components/core')
    }
  },
  plugins: [
    // https://github.com/moment/moment/issues/2416
    new webpack.ContextReplacementPlugin(/moment\/locale$/, /(zh-cn)$/),
    new BundleAnalyzerPlugin(),
    new CompressionWebpackPlugin({
          test: /\.(js|css|less)$/, // 匹配文件名
          threshold: 10240, // 对超过10k的数据压缩
          minRatio: 0.8,
          deleteOriginalAssets: false // 删除源文件
    })
  ],
  externals: {
    echarts: 'echarts',
    VeIndex: 'echarts'
  }
}

module.exports = {
  outputDir: page.outputDir,
  publicPath: page.publicPath,
  lintOnSave: process.env.NODE_ENV !== 'production',
  productionSourceMap: process.env.NODE_ENV !== 'production',
  pages: { index: page },
  devServer: {
    proxy: {
      '^/login|send|findPassword|order|user|register|upload|uploadVideo|content-manager|users-permissions|works|qrConfig|company|scripts|datasources|admin|psd-files|workforms|third-libs|engine-assets/': {
        target,
        changeOrigin: true,
        ws: false
      }
    }
  },
  chainWebpack(config) {
        config
            .plugin('webpack-aliyun-oss-plugin')
            .use(require('webpack-aliyun-oss-plugin'), [{
                buildPath: 'dist/**',
                region: oss.region, // 只是示例，如果是别的地区请填别的地区
                ak: oss.accessKeyId, // 不知道ak和sk的百度以下把～
                sk: oss.accessKeySecret,
                bucket: oss.bucket,  // bucket的name
                deleteAll: true,
                filter: function(asset) {
                    return !/\.html$/.test(asset) // 不上传index.html
                }
            }])
  },
  configureWebpack,
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': [
          // './src/theme'
        ]
      },
    },
    extract: false
  },
  pwa: {
    iconPaths: {
      favicon32: 'img/icons/favicon.ico',
      favicon16: 'img/icons/favicon.ico',
      appleTouchIcon: 'img/icons/favicon.ico',
      maskIcon: 'img/icons/favicon.ico',
      msTileImage: 'img/icons/favicon.ico'
    }
  }
}
