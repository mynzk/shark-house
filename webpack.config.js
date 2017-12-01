const path = require('path');
const webpack = require('webpack');
const sourcePath = path.resolve(__dirname, 'src/index');
const outputPath = path.join(__dirname, 'dist');

module.exports = {
    entry: [
        'webpack-hot-middleware/client?reload=true',
        sourcePath
    ],
    devtool: 'source-map',
    output: {
        path: outputPath,
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)?$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            },
            {
                test: /\.(png|jpg)$/,
                use: 'url-loader?limit=8192'
            },
            {
                test: /\.css$/,
                use: ["style-loader",'css-loader']
            },
            {
                test: /\.less$/,
                use: ["style-loader",'css-loader', 'less-loader']
            },
            {
                test: /\.scss$/,
                 use: ["style-loader",'css-loader', 'sass-loader']
            },
        ]
    },

    resolve: {
        extensions: ['.js', '.jsx'],
        modules: [
          sourcePath,
          'node_modules'
        ]
    }
}