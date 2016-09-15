var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'eval',
    entry: {
        bundle: [
            'webpack-dev-server/client?http://localhost:3000',
            'webpack/hot/only-dev-server',
            './src/index'
        ],
        vendors: [
            'react',
            'react-dom',
            'redux',
            'react-redux',
            'redux-thunk',
            'classnames'
        ]
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
        publicPath: '/static/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ProvidePlugin({
            _: 'lodash'
        }),
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['react-hot', 'babel'],
                include: path.join(__dirname, 'src')
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.sass/,
                loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded&indentedSyntax'
            },
            {
                test: /\.scss/,
                loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded'
            },
        ]
    }
};
