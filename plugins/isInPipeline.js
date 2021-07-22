const isPipeLine = function () {
  return process.argv.includes("--pipeline")
}
module.exports = isPipeLine();
