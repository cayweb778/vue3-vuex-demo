/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable */
// @ts-nocheck
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
module.exports = {
  lintOnSave:false,
  // 使用这个插件
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.txt$/i,
          use: 'raw-loader',
        },
      ],
    },
    output: {
      libraryExport: 'default',
      filename: 'webpack-numbers.js',
    },

    externals: {
      $pingzheng: 'abc'
    },
    plugins: [
    ]
  }
};
