const path = require("path");

const fs = require("fs");

const filePath = path.join(__dirname,"dist/base.wxml");

const fsStr = fs.readFileSync(filePath,"utf-8");


const templates = {

}

const templateList = fsStr.match(/tmpl_(\d+)_[^"]+/g)


console.log("template List:",templateList);

templateList.forEach(function (item) {
    const cArr = item.split("_");
    const currentNum = +cArr[1] + 1;
    const cName = cArr[2];

    if(templates[cName]){
        if(currentNum > templates[cName]){
            templates[cName] = currentNum
        }
    }else{
        templates[cName] = currentNum
    }
});
const tFilePath = path.join(__dirname,"dist/total.json");
console.log("total Components:",Object.keys(templates));
fs.writeFileSync(tFilePath,JSON.stringify(Object.keys(templates)),"utf-8")
const dFilePath = path.join(__dirname,"dist/detail.json");
console.log("total Components:",templates);
fs.writeFileSync(dFilePath,JSON.stringify(templates),"utf-8")
