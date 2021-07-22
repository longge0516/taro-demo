const config = {
  projectName: 'taroDemo',
  date: '2021-7-22',
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: [],
  defineConstants: {},
  copy: {
    patterns: [],
    options: {}
  },
  framework: 'react',
  mini: {
    optimizeMainPackage: {
      enable: true
    },
    addChunkPages(pages) {
      pages.set('pages/subPackages/page1/index', ['page1TaroCommon'])
      pages.set('pages/subPackages/page2/index', ['page2TaroCommon'])
    },
    webpackChain(chain) {
      chain.merge({
        externals: [
          (context, request, callback) => {
            const externalDirs = ['@miniapp']
            const externalDir = externalDirs.find(dir => request.startsWith(dir))
            // if (process.env.NODE_ENV === 'production' && externalDir) {
            if (externalDir) {
              //todo? 此处暂时不修改文件路径,不要源文件地址，只要打完包的文件地址
              return callback(null, `commonjs ${request}`)
            }
            callback()
          }
        ],
        optimization: {
          splitChunks: {
            cacheGroups: {
              react: {
                name: 'vendors',
                test: module => {
                  return /[\\/]node_modules[\\/](react-reconciler|scheduler)/.test(module.resource)
                }
              },
              "page1TaroCommon": {
                name: "pages/subPackages/page1/page1TaroCommon",
                minChunks: 2,
                test: function (module, chunks) {
                  return !/@miniapp/.test(module.resource) && /commonModule/.test(module.resource)
                },
                priority: 200
              },
              "page2TaroCommon": {
                name: "pages/subPackages/page2/page1TaroCommon",
                minChunks: 2,
                test: function (module, chunks) {
                  return !/@miniapp/.test(module.resource) && /commonModule/.test(module.resource)
                },
                priority: 200
              }
            }
          }
        }
      })
    },
    postcss: {
      pxtransform: {
        enable: true,
        config: {}
      },
      url: {
        enable: true,
        config: {
          limit: 1024 // 设定转换尺寸上限
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    postcss: {
      autoprefixer: {
        enable: true,
        config: {}
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  }
}

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
