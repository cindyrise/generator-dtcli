var webpack = require('webpack')
var WebpackDevServer = require('webpack-dev-server')
var config = require('./webpack.config')
const errorOverlayMiddleware = require('react-error-overlay/middleware')
const serverConfig = require('./server.config')
var proxy = require('http-proxy-middleware')

new WebpackDevServer(webpack(config), {
    hot: true,
    compress: true,
    historyApiFallback: true,
    publicPath: '/',
    watchOptions: {
        ignored: /node_modules/,
    },
    stats: {
        modules: false,
        chunks: false
    },
    setup(app) {
        app.use(errorOverlayMiddleware())
        if (process.env.NODE_ENV !== 'build') {
            app.use('/m/*', proxy({
                target: 'http://172.16.6.149:9090/',
                secure: false
            }))
        }
    }
}).listen(serverConfig.port, serverConfig.host, function (err, result) {
    if (err) {
        return console.log(err);
    }
    console.log(`Listening at http://${serverConfig.host}:${serverConfig.port}/`);
});
