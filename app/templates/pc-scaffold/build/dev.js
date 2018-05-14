// Modules
const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const rootPath = path.resolve(__dirname, '../');
const buildPath = path.resolve(rootPath, 'dist');
const serverConfig = require('./server.js')
const  theme = require('../antd-theme.js');

let ENV = process.env.npm_lifecycle_event;
let isProd = ENV === 'build';
let extractCSS = new ExtractTextPlugin({filename: 'styles.css'});

module.exports = function makeWebpackConfig() {
  let config = {};
  config.entry =  {
    vendor: ['react', 'react-dom', 'react-router',
      'moment','echarts'],
    app: [
      'react-hot-loader/patch',
      `webpack-dev-server/client?http://${serverConfig.host}:${serverConfig.port}`,
      'webpack/hot/only-dev-server',
      path.resolve(__dirname, '../src/webapp/app.js')
    ]
  };

  config.output =  {
    publicPath: "/",
    filename: isProd ? '[name].bundle.js' : '[name].bundle.js',
    chunkFilename: isProd ? '[name].bundle.js' : '[name].bundle.js',
    sourceMapFilename: '[name].map'
  };

  config.devtool = isProd ? 'source-map' : 'cheap-eval-source-map',
    config.module = {
      rules: [{
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      }, {
        test: /\.(less|css)$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", 'less-loader'] //开发环境
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
      }]
    };
  config.resolve = {
    extensions: ['.js', '.jsx', '.less', '.scss', '.css', '.json'],
    modules: [
      path.resolve(__dirname, "../src"),
      path.resolve(__dirname, '../node_modules'),
    ]
  };

  config.plugins = [
    new webpack.DefinePlugin({
      __PRODUCTION: JSON.stringify(false)
    }),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/),
  ];

  config.plugins.push(new CopyWebpackPlugin([{
    from: path.resolve(__dirname, '../mock')
  }]),
  new CopyWebpackPlugin([{
    from: path.resolve(rootPath, './src/webapp/config')
  }]),
  new CopyWebpackPlugin([{
    from: path.resolve(rootPath, './src/webapp/assets')
  }]));

  config.plugins.push(
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '../src/webapp.ejs'),
      inject: 'body',
      chunks: ['vendor', 'app'],
      showErrors: true,
      assets: {
        favicon: '/img/favicon.ico',
        config_js: '/conf.dev.js'
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    extractCSS,
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      filename: 'vendor.js',
      minChunks: Infinity,
    })
  )

  config.devServer = {
    compress: true,
    hot:true,
    watchOptions: {
      ignored: /node_modules/,
    },
    host: serverConfig.host,
    port: serverConfig.port,
    publicPath: "/",
    historyApiFallback: true,
    disableHostCheck: true,
    proxy: [
      {
        path: '/log/api/v2/**',
        target: 'http://log.dev.dtstack.net:81',
        changeOrigin: true
      }
    ]
  };
  config.externals = {
    'FRONT_CONF': 'FRONT_CONF'
  };
  return config;
}();
