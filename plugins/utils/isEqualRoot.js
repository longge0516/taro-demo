module.exports = function (pathRoot, appRoot) {
  //先去掉头部的/
  appRoot = appRoot.slice(0, 1) === "/" ? appRoot.slice(1) : appRoot;
  pathRoot = pathRoot.slice(0, 1) === "/" ? pathRoot.slice(1) : pathRoot;
  return pathRoot === appRoot || pathRoot + "/" === appRoot || pathRoot === appRoot + "/"
}
