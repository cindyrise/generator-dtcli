// Modules
const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
//require('ng-annotate');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const rootPath = path.resolve(__dirname, '../');
const serverConfig = require('./server.js')
/**
 * Env
 * Get npm lifecycle event to identify the environment
 */


let ENV = process.env.npm_lifecycle_event;
let isTest = ENV === 'test' || ENV === 'test-watch';
let isProd = ENV === 'build';
let extractCSS = new ExtractTextPlugin('[name].bundle.css');

module.exports = function makeWebpackConfig() {
  let config = {};
  config.entry = isTest ? {} : {
    vendor: ['react', 'react-dom', 'react-router',
      'moment'],
    webapp: [
      'react-hot-loader/patch',
      `webpack-dev-server/client?http://${serverConfig.host}:${serverConfig.port}`,
      'webpack/hot/only-dev-server',
      path.resolve(__dirname, '../src/webapp/app.js')
    ]
  };

  config.output = isTest ? {} : {
    path: rootPath,
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
      'actions': path.resolve(__dirname, '../src/webapp/features/actions'),
      "constants": path.resolve(__dirname, "../src/webapp/features/constants"),
      "reducers": path.resolve(__dirname, "../src/webapp/features/reducers"),
      "pages": path.resolve(__dirname, "../src/webapp/features/pages"),
      'apis': path.resolve(__dirname, '../src/webapp/api'),
      "utils": path.resolve(__dirname, "../src/webapp/utils"),
      'react/lib/ReactMount': 'react-dom/lib/ReactMount',
    }
  };

  if (isTest) {
    config.module.preLoaders.push({
      test: /\.js$/,
      exclude: [
        /node_modules/,
        /\.spec\.js$/
      ],
      loader: 'isparta-instrumenter'
    })
  }

  config.plugins = [
    new webpack.DefinePlugin({
      __PRODUCTION: JSON.stringify(false)
    }),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/),
  ];

  // Skip rendering index.html in test mode
  if (!isTest) {
    config.plugins.push(
      new HtmlWebpackPlugin({
        filename: 'webapp.html',
        template: path.resolve(__dirname, '../src/webapp.ejs'),
        inject: 'body',
        chunks: ['vendor', 'webapp'],
        showErrors: true,
        assets: {
          favicon: 'img/favicon.ico',
          config_js: './config.dev.js'
        }
      }),
      new webpack.HotModuleReplacementPlugin(),
      // 开启全局的模块热替换（HMR）

      new webpack.NamedModulesPlugin(),
      extractCSS,
      new webpack.optimize.CommonsChunkPlugin({
        name: "vendor",
        chunks: ['webapp'],
        filename: 'vendor.js',
        minChunks: Infinity,
      })
    )
  }

  config.plugins.push(new CopyWebpackPlugin([{
    from: path.resolve(__dirname, '../mock')
  }]),
  new CopyWebpackPlugin([{
    from: path.resolve(rootPath, './config')
  }]),
  new CopyWebpackPlugin([{
    from: path.resolve(rootPath, './src/webapp/assets')
  }]));

  config.devServer = {
    contentBase: rootPath,
    host: serverConfig.host,
    hot: true,
    port: serverConfig.port,
    disableHostCheck: true,
    proxy: [
      {
        path: '/log/api/v2/**',
        //target: 'http://172.16.1.209:8854',
        //target: 'http://172.16.1.44:8854',
        target: 'http://log.dev.dtstack.net:81',
        changeOrigin: true
      }
    ],
    setup: function (app) {
      // Here you can access the Express app object and add your own custom middleware to it.
      // For example, to define custom handlers for some paths:
    },
  };
  /*
    打包例外的第三方库
  */
  config.externals = {
    'LOGAPICONF': 'LOGAPICONF'
  };
  return config;
}();
