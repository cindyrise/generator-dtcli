'use strict';

// Modules
const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
//require('ng-annotate');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const rootPath = path.resolve(__dirname, '../');
const buildPath = path.resolve(rootPath, 'dist');
/**
 * Env
 * Get npm lifecycle event to identify the environment
 */
let ENV = process.env.npm_lifecycle_event;
let isTest = ENV === 'test' || ENV === 'test-watch';
let isProd = ENV === 'build';
let extractCSS = new ExtractTextPlugin('[name].bundle.css');
module.exports = function makeWebpackConfig() {
  /**
   * Config
   * Reference: http://webpack.github.io/docs/configuration.html
   * This is the object where all configuration gets set
   */
  let config = {};

  config.entry = isTest ? {} : {
    vendor: ['react', 'react-dom', 'react-router', 'react-color',
      'moment', 'react-ace', 'd3', 'recharts', 'lodash'
    ],
    webapp: [path.resolve(__dirname, '../src/webapp/app.js')],
  };

  config.output = isTest ? {} : {
    path: buildPath,
    publicPath: '/',
    filename: isProd ? '[name].bundle.js' : '[name].bundle.js',
    chunkFilename: isProd ? '[name].bundle.js' : '[name].bundle.js'
  };

  config.module = {
    rules: [{
      test: /\.js$/,
      use: ['babel-loader'],
      exclude: /node_modules/,
    }, {
      test: /\.(less|css)$/,
      use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: ["css-loader", 'less-loader?{modifyVars:{"icon-url":"\'../../../../../src/webapp/assets/fonts/antdfont/antd_icon\'"}}'],
      })
    }, {
      test: /\.(scss|sass)$/,
      use: ['style-loader', 'css-loader?-minimize', 'sass-loader?sourceMap']
    }, {
      test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?[tv]=[\d.]+)*$/,
      use: ['file-loader?name=[name].[ext]']
    }, {
      test: /\.html$/,
      use: ['raw']
    },
    {
      test: /\.ejs$/,
      use: ["ejs-loader"]
    }, {
      test: /\.(js|ts)$/,
      use: ["strip-loader?strip[]=debug,strip[]=console.log"],
      exclude: /node_modules/
    },
    ]
  };
  config.resolve = {
    extensions: ['.js', '.jsx', '.less', '.scss', '.css', '.json'],
    modules: [
      path.resolve(__dirname, "../src"),
      path.resolve(__dirname, '../node_modules'),
    ],
    alias: {
      'react/lib/ReactMount': 'react-dom/lib/ReactMount',
      'actions': path.resolve(__dirname, '../src/webapp/features/actions/'),
      "constants": path.resolve(__dirname, "../src/webapp/features/constants/"),
      "reducers": path.resolve(__dirname, "../src/webapp/features/reducers/"),
      "pages": path.resolve(__dirname, "../src/webapp/features/pages/"),
      'apis': path.resolve(__dirname, '../src/webapp/api/'),
      "utils": path.resolve(__dirname, "../src/webapp/utils/"),
    }
  };



  /**
   * Plugins
   * Reference: http://webpack.github.io/docs/configuration.html#plugins
   * List: http://webpack.github.io/docs/list-of-plugins.html
   */
  config.plugins = [
    new webpack.DefinePlugin({
      __PRODUCTION: JSON.stringify(true),
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/),
  ];

  // Skip rendering index.html in test mode
  if (!isTest) {
    config.plugins.push(
      new HtmlWebpackPlugin({
        filename: 'webapp.html',
        template: path.resolve(__dirname, '../src/public/pages/webapp.ejs'),
        inject: 'body',
        chunks: ['vendor', 'webapp'],
        assets: {
          favicon: 'img/favicon.ico',
          config_js: 'config/config.js',
          title:"袋鼠云内部网址导航"
        },
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true,
        }
      }),
      extractCSS
    )
  }

  // Add build specific plugins
  if (isProd) {
    config.plugins.push(
      // Reference: http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
      // Minify all javascript, switch loaders to minimizing mode
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
        comments: false,
        ie8: true
      }),
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: "vendor",
        chunks: ['webapp'],
        filename: 'vendor.js',
        minChunks: Infinity,
        // (with more entries, this ensures that no other module
        //  goes into the vendor chunk)
      }),
      // Copy assets from the public folder
      // Reference: https://github.com/kevlened/copy-webpack-plugin
      new CopyWebpackPlugin([{
        from: path.resolve(__dirname, '../src/public'),
      }])
    )
  }

  /**
   * Dev server configuration
   * Reference: http://webpack.github.io/docs/configuration.html#devserver
   * Reference: http://webpack.github.io/docs/webpack-dev-server.html
   */
  config.devServer = {
    contentBase: buildPath,
    stats: 'minimal'
  };
  /*
    打包例外的第三方库
  */
  config.externals = {
    'LOGAPICONF': 'LOGAPICONF'
  };
  return config;
}();

