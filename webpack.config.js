module.exports = options => {
    return {
        entry: "./React/App.js",
        output: {
            path: __dirname + "/frontend/javascript/",
            filename: 'react-bundle.js'
        },
        module: {
            rules: [
                {
                    test: /.js$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                cacheDirectory: true,
                            }
                        }
                    ]
                }
            ]
        }
    }
}