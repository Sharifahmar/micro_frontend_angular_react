const webpackMerge = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react");
const DeadCodePlugin = require('webpack-deadcode-plugin');

const path = require("path");

module.exports = (webpackConfigEnv) => {
    const defaultConfig = singleSpaDefaults({
        orgName: "react-mf",
        projectName: "react-app",
        webpackConfigEnv,
    });

    const rxjsExternals = {
        externals: [ /^rxjs\/?.*$/ ],
    };

    // const unusedFileWarning = {
    //     plugins: [
    //         new DeadCodePlugin({
    //             detectUnusedFiles: false
    //         })
    //     ]
    // };

    return webpackMerge.smart(defaultConfig, rxjsExternals, {
        module: {
            rules: [
                {
                    test: /\.css|\.scss$/,
                    use: [ 'style-loader', 'css-loader', 'sass-loader' ],
                },
                {
                    test: /\.(png|svg|jpg|gif)$/,
                    use: [
                        'file-loader',
                    ],
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/,
                    use: [
                        'file-loader',
                    ],
                },
            ],
        },

    });

};