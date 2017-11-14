const { resolve } = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function(env) {
  return {
    entry: [
      // activate HMR for React
      'react-hot-loader/patch',

      // bundle the client for webpack-dev-server
      // and connect to the provided endpoint
      'webpack-dev-server/client?http://localhost:8080',

      // bundle the client for hot reloading
      // only - means to only hot reload for successful updates
      'webpack/hot/only-dev-server',

      // the entry point of the app
      resolve(__dirname, 'src/index.js')
    ],
    output: {
      // the output bundle
      filename: 'bundle.js',

      path: resolve(__dirname, 'dist'),

      // necessary for HMR to know where to load the hot update chunks
      publicPath: '/'
    },

    // context: resolve(__dirname, 'src'),

    devServer: {
      // enable HMR on the server
      hot: true,

      // match the output path
      contentBase: resolve(__dirname, 'dist'),

      // match the output `publicPath`
      publicPath: '/',

      historyApiFallback: true
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
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 1,
                localIdentName: '[name]__[local]___[hash:base64:5]'
              }
            },
            'postcss-loader'
          ],
        },
        {
          test: /\.global\.css$/,
          use: [
            'style-loader',
            { loader: 'css-loader', options: { modules: false } },
            'postcss-loader'
          ],
        },
        {
          test: /\.scss$/,
          use: [
            'style-loader',
            { loader: 'css-loader', options: { modules: false } },
            'sass-loader',
          ],
        },
        {
          test: /\.(eot|woff2?|woff|ttf)$/,
          use: [
            'file-loader?name=assets/fonts/[name].[ext]'
          ]
        },
        {
          test: /\.(jpg|png|svg)$/,
          use: [
            'file-loader?name=assets/img/[name].[ext]'
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

      // enable HMR globally
      new webpack.HotModuleReplacementPlugin(),

      // prints more readable module names in the browser console on HMR updates
      new webpack.NamedModulesPlugin(),

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
