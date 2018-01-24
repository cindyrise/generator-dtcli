const path = require('path')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const argv = require('yargs').argv
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const serverConfig = require('./server.config')

//判断当前运行环境是开发模式还是生产模式
const nodeEnv = process.env.npm_lifecycle_event
const isPro = nodeEnv === 'build'

console.log("当前运行环境：", isPro ? 'production' : 'development')

const plugins = [
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor'
    }),
    new webpack.DefinePlugin({
        // 定义全局变量
        __PRODUCTION: JSON.stringify(nodeEnv),
        'process.env': {
            'NODE_ENV': JSON.stringify(nodeEnv)
        }
    }),
    new ExtractTextPlugin({
        filename: 'styles.css'
    }),
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './index.html',
        inject: 'body',
        chunks: ['vendor', 'app'],
        showErrors: true,
    }),
    new CopyWebpackPlugin([{
        from: "./public"
    }])
]
const app = ['./app']
if (isPro) {
    plugins.push(
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            comments: false,
            ie8: true
        })
    )
} else {
    app.unshift('react-hot-loader/patch', `webpack-dev-server/client?http://${serverConfig.host}:${serverConfig.port}`, 'webpack/hot/only-dev-server')
    plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    )

}

module.exports = {
    context: path.resolve(__dirname, 'src'),
    devtool: isPro ? 'source-map' : 'inline-source-map',
    entry: {
        vendor: ['react', 'react-dom', 'react-router'],
        app: app
    },
    output: {
        filename: '[name].[hash].js',
        path: path.join(__dirname, 'dist'),
        publicPath: './',
        chunkFilename: '[name].[hash].js'
    },
    // BASE_URL是全局的api接口访问地址
    plugins,
    // alias是配置全局的路径入口名称，只要涉及到下面配置的文件路径，可以直接用定义的单个字母表示整个路径
    resolve: {
        extensions: ['.js', '.jsx', '.less', '.scss', '.css'],
        modules: [
            path.resolve(__dirname, 'node_modules'),
            path.join(__dirname, './src')
        ],
        alias: {
            "components": path.resolve(__dirname, "src/components"),
            "containers": path.resolve(__dirname, "src/containers"),
            "utils": path.resolve(__dirname, "src/utils"),
        }
    },

    module: {
        rules: [{
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: 'babel-loader'
        }, {
            test: /\.(less|css)$/,
            use:["style-loader", "css-loader", "less-loader"]
        },
        {
            test: /\.(scss|sass)$/,
            use: ['style-loader', 'css-loader?-minimize', 'sass-loader?sourceMap']
        },
        {
            test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
            use: ['file-loader?limit=1000&name=files/[md5:hash:base64:10].[ext]']
        },
          {
            test: /\.(graphql|gql)$/,
            exclude: /node_modules/,
            use: [
              {
                loader: 'graphql-tag/loader'
              },
            ]
          }
    ]
    },
    externals: {
        'LOGAPICONF': 'LOGAPICONF'
    }
};
