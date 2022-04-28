//#region > Imports
const withCSS = require("@zeit/next-css");
const withFonts = require("next-fonts");
const withImages = require("next-images");
const withPlugins = require("next-compose-plugins");
//#endregion

//#region > Exports
module.exports = [
    withCSS({
        webpack(config, options) {
            config.module.rules.push({
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                use: {
                    loader: "url-loader",
                    options: {
                        limit: 100000,
                    },
                },
            });

            return config;
        },
    }),
    withPlugins([withFonts, withImages]),
];