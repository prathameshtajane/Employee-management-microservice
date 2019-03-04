module.exports = {
    entry: './src/main',
    output: {
        path: __dirname + "/dist",
        filename: "bundle.js"
    },
    module: {
        rules: [{
            test: /\.ts$/,
            loader: 'ts-loader',
            exclude: /node_modules/,
        },
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: "source-map-loader"
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    devtool: 'inline-source-map',
};