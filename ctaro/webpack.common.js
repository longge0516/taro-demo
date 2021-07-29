const path = require("path");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
  entry: {
    "commonModule.prod": './commonModule.js', //需要打包的文件
    // "commonModule.style.prod": './css/commonModule.scss', //需要打包的样式文件
  },
  output: {
    filename: '[name]' + '.js',
    path: path.join(__dirname, "./src/pages/taroDemo"),
    libraryTarget: 'commonjs2',
  },
  mode: "production",//"development",
  externals: [
    (context, request, callback) => {
      const externalDirs = [
        '@miniapp',
        '@/miniapp', '@tarojs',
        'react', 'react-dom',
        'react-reconciler',
        'scheduler',
        'taroCwx']
      const externalDir = externalDirs.find(dir => request.indexOf(dir) !== -1)
      // if (process.env.NODE_ENV === 'production' && externalDir) {
      if (externalDir) {
        //todo? 此处暂时不修改文件路径,不要源文件地址，只要打完包的文件地址
        return callback(null, `commonjs ${request}`)
      }
      callback()
    }
  ],
  plugins: [
    // new MiniCssExtractPlugin({
    //   filename: '[name].css',
    //   chunkFilename: '[id].css',
    // })
  ],
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-react',
                ['@babel/preset-env', {
                  "targets": "> 0.25%, not dead"
                }]
              ],
              plugins: [
                "@babel/plugin-transform-runtime",
                "@babel/plugin-proposal-export-default-from",
                ["@babel/plugin-proposal-decorators", {'legacy': true}],
                "@babel/plugin-proposal-function-bind",
                ["@babel/plugin-proposal-class-properties", {'loose': false}]
              ]
            }
          }
        ]
      },
      // {
      //   test: /\.(sa|sc|c)ss$/,
      //   use: [
      //     {
      //       loader: MiniCssExtractPlugin.loader,
      //       options: {
      //         // hmr: process.env.NODE_ENV === 'development',
      //       },
      //     },
      //     'css-loader',
      //     {
      //       loader: 'postcss-loader',
      //       options: {
      //         ident: 'postcss',
      //         plugins: [require('autoprefixer')()]
      //       }
      //     },
      //     'sass-loader',
      //   ],
      // }
    ]
  }
}
