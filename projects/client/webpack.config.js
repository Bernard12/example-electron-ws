const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: ["./src/index.tsx", "./src/assets/styles.scss"],
    mode: "none",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/
            },
            {
                test: /\.html$/,
                use: "html-loader"
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
            }
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
        modules: ["node_modules"]
    },
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    devtool: "inline-source-map",
    plugins: [
        new HtmlWebpackPlugin({
            inject: "body",
            template: "./src/index.html"
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css"
        })
    ]
};
