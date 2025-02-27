/* eslint-disable @typescript-eslint/no-var-requires */
// import { ImageminPlugin } from "imagemin-webpack-plugin";
// import imageminMozjpeg from "imagemin-mozjpeg";


const path = require("path");

// const ImageminPlugin = require("imagemin-webpack-plugin").default;
// const ImageminMozjpeg = require("imagemin-mozjpeg");
// const ImageminWebp = require("imagemin-webp");
const CopyPlugin = require("copy-webpack-plugin");
const nodeExternals = require("webpack-node-externals");

function abs(...args) {
  return path.join(__dirname, ...args);
}

const SRC_ROOT = abs("./src");
const PUBLIC_ROOT = abs("./public");
const DIST_ROOT = abs("./dist");
const DIST_PUBLIC = abs("./dist/public");

/** @type {Array<import('webpack').Configuration>} */
module.exports = [
  {
    // devtool: "inline-source-map",
    entry: path.join(SRC_ROOT, "client/index.jsx"),
    // mode: "development",
    mode: "production",
    module: {
      rules: [
        {
          resourceQuery: (value) => {
            const query = new URLSearchParams(value);
            return query.has("raw");
          },
          type: "asset/source",
        },
        {
          // exclude: /[\\/]esm[\\/]/,
          // exclude: /node_modules/,
          exclude: /(node_modules|[\\/]esm[\\/])/,
          test: /\.jsx?$/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    modules: "cjs",
                    spec: true,
                  },
                ],
                "@babel/preset-react",
              ],
            },
          },
        },
      ],
    },
    name: "client",
    output: {
      path: DIST_PUBLIC,
    },
    plugins: [
      new CopyPlugin({
        patterns: [{ from: PUBLIC_ROOT, to: DIST_PUBLIC }],
      }),
      // new ImageminPlugin({
      //   test: /\.(jpe?g|png)$/i,
        // destination: 'build',
        // plugins: [
        //   ImageminMozjpeg({
        //     quality: 85,
        //     progressive: true,
        //   }),
        // ],
        // pngquant: {
        //   quality: '70-85',
        // },
        // }),
    ],
    resolve: {
      extensions: [".js", ".jsx"],
    },
    target: "web",
  },
  {
    devtool: "inline-source-map",
    entry: path.join(SRC_ROOT, "server/index.js"),
    externals: [nodeExternals()],
    mode: "development",
    module: {
      rules: [
        {
          exclude: /node_modules/,
          test: /\.(js|mjs|jsx)$/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    modules: "cjs",
                    spec: true,
                  },
                ],
                "@babel/preset-react",
              ],
            },
          },
        },
      ],
    },
    name: "server",
    output: {
      filename: "server.js",
      path: DIST_ROOT,
    },
    resolve: {
      extensions: [".mjs", ".js", ".jsx"],
    },
    target: "node",
  },
];
