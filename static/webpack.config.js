var HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    //context: path.join(__dirname, "frontend"),
    entry: {
        app: './src/index.jsx'    },
    mode: 'development',
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                //loader: 'babel-loader'
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader'
                }],
            }
        ]
    },
    watch: true,
    devtool: 'source-map',
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname,'dist') 
    },
    plugins: [new HtmlWebpackPlugin({
        template: './src/index.html'
    })],
    devServer: {
        historyApiFallback: true
    },
    externals: {
        // global app config object
        config: JSON.stringify({
            apiUrl: 'http://localhost:4000'
        })
    }
}