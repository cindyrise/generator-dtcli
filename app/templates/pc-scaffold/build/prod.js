
const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const rootPath = path.resolve(__dirname, '../');
const buildPath = path.resolve(rootPath, 'dist');
const  theme = require('../antd-theme.js');

let ENV = process.env.npm_lifecycle_event;
let isProd = ENV === 'build';
let extractCSS = new ExtractTextPlugin({filename: 'styles.css'});
module.exports = function makeWebpackConfig() {
  
  let config = {};
  config.entry = {
    vendor: ['react', 'react-dom', 'react-router',
      'moment','echarts'],
    app: [path.resolve(__dirname, '../src/webapp/app.js')],
  };

  config.output =  {
    filename: '[name].[hash].js',
    path: buildPath,
    publicPath: '/',
    chunkFilename: '[name].[hash].js'
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
        use: ["css-loader", "less-loader?{modifyVars:"+JSON.stringify(theme)+"}"],
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
      "utils": path.resolve(__dirname, "../src/webapp/utils/"),
    }
  };

  config.plugins = [
    new webpack.DefinePlugin({
      __PRODUCTION: JSON.stringify(true),
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/),
  ];

  config.plugins.push(new HtmlWebpackPlugin({
    filename: "index.html",
    template: path.resolve(__dirname, "../src/webapp.ejs"),
    inject: "body",
    chunks: ["vendor", "app"],
    assets: {
      favicon: "img/favicon.ico",
      config_js: "/conf.prod.js"
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
      minifyCSS: true
      //minifyURLs: true,
    }
  }), extractCSS);

  if (isProd) {
    config.plugins.push(
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
        filename: 'vendor.js',
        minChunks: Infinity,
      }),
     new CopyWebpackPlugin([{
        from: path.resolve(rootPath, './src/webapp/config')
      }]),
      new CopyWebpackPlugin([{
        from: path.resolve(rootPath, './mock')
      }]),
      new CopyWebpackPlugin([{
        from: path.resolve(rootPath, './src/webapp/assets')
      }])
    )
  }

  config.devServer = {
    contentBase: buildPath,
    stats: 'minimal'
  };
  config.externals = {
    'FRONT_CONF': 'FRONT_CONF'
  };
  return config;
}();

