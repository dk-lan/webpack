const path = require('path');

module.exports = {
    entry: './src/js/app.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {test: /\.js$/, loader: 'babel-loader'},
            {test: /\.scss$/, loader: 'style-loader!css-loader!sass-loader'}
        ]
    }
}