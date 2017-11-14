const { resolve } = require('path');
const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function(env) {
  return {
    // the entry point of the app
    entry: resolve(__dirname, 'src/index.js'),

    output: {
      // the output bundle
      filename: 'bundle.js',

      path: resolve(__dirname, 'dist'),

      // necessary for HMR to know where to load the hot update chunks
      publicPath: ''
    },

    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules|bower_components)/,
          use: [
            'babel-loader',
          ]
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules|\.spec\.js/,
          use: [
            'eslint-loader',
          ]
        },
        {
          test: /\.css$/,
          exclude: /\.global\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {
                  modules: true,
                  importLoaders: 1,
                  localIdentName: '[name]__[local]___[hash:base64:5]'
                }
              },
              'postcss-loader'
            ]
          })
        },
        {
          test: /\.global\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              { loader: 'css-loader', options: { modules: false } },
              'postcss-loader'
            ]
          })
        },
        {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              { loader: 'css-loader', options: { modules: false } },
              'sass-loader'
            ]
          })
        },
        {
          test: /\.(eot|woff2?|woff|ttf)$/,
          use: [
            'file-loader?name=/assets/fonts/[name].[ext]'
          ]
        },
        {
          test: /\.(jpg|png|svg)$/,
          use: [
            'file-loader?name=/assets/img/[name].[ext]'
          ]
        },
      ]
    },

    resolve: {
      extensions: [".js", ".jsx", ".css"],
      alias: {
        style: resolve(__dirname, 'src/assets/css/index.css'),
        tachyons: resolve(__dirname, 'node_modules/tachyons/css/tachyons.css'),
      }
    },

    plugins: [
      new webpack.DefinePlugin({
        __ENV__: JSON.stringify(env)
      }),

      new ExtractTextPlugin({ filename: 'assets/css/bundle.css', allChunks: true }),

      // generate index.html
      new HtmlWebpackPlugin({
        title: 'BPI Viewer',
        template: 'src/assets/index.ejs',
        hash: true,
        env: 'dev'
      })
    ]
  };
};
