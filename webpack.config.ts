import * as webpack from 'webpack';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';



const config: webpack.Configuration = {
    entry: "./src/index.tsx",
    output: {
        filename: "bundle.js",
        path: __dirname + "/dist",
        publicPath: "/dist"
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",
    devServer: {
        proxy: {
            '/api': {
              target: 'http://localhost:3001',
              pathRewrite: {'^/api' : ''}
            }
        }
    },

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.     
            {
                test: /\.tsx?$/,
                loader: 'ts-loader'
            }
        ]
    },
    plugins: [new HtmlWebpackPlugin()]
};

export default config;
