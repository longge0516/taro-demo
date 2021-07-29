const fs = require("fs");
const path = require("path");
const root = path.join(__dirname, "../");
const resultFile = path.join(__dirname, "analyzer.json");
const PLUGIN_NAME = 'MiniSplitChunkPlugin';

class AnalyzerPlugin {
  constructor(options) {
    this.chunFiles = {}
  }

  apply(compiler) {
    compiler.hooks.compilation.tap(PLUGIN_NAME, (compilation) => {
      compilation.hooks.afterOptimizeChunks.tap(PLUGIN_NAME, (chunks) => {
        chunks.forEach((chunk) => {
          const modules = Array.from(chunk.modulesIterable);
          modules.map((module) => {
            if (module.resource || module._identifier) {
              const filePath = path.relative(root, module.resource || module._identifier)
              if (!this.chunFiles[chunk.name]) {
                this.chunFiles[chunk.name] = [];
              }
              if (!this.chunFiles[chunk.name].includes(filePath)) {
                this.chunFiles[chunk.name].push(filePath)
              }
            }
          })
        });
      });
    })

    compiler.hooks.afterEmit.tap(PLUGIN_NAME, (compilation) => {
      // console.log(compilation)
      fs.writeFileSync(resultFile, JSON.stringify(this.chunFiles), "utf-8")
    })

  }
}

module.exports = AnalyzerPlugin;
