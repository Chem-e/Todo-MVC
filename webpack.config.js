const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    module: {

        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                }
            },
            {
                enforce: "pre",
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "eslint-loader",
            },
            {
                test: /\.html$/,
                use: [{
                    loader: "html-loader",
                    options: { minimize: true }
                }]
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            },
            {
                "test": /\.(eot|svg)$/,
                "loader": "file-loader?name=[name].[ext]"
            },
            {
                "test": /\.(jpg|png|gif|otf|ttf|woff|woff2|cur|ani)$/,
                "loader": "url-loader?name=[name].[ext]&limit=10000"
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ]
};