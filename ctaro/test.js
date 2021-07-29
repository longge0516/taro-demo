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

var base = {
  container: 16,
    'catch-view': 15,
  'static-view': 15,
  'pure-view': 15,
  view: 15,
  icon: 1,
  progress: 1,
  'rich-text': 1,
  'static-text': 6,
  text: 15,
  button: 1,
  checkbox: 1,
  'checkbox-group': 1,
  form: 4,
  input: 1,
  "')}}": 1,
  label: 6,
  picker: 1,
  'picker-view': 1,
  'picker-view-column': 1,
  radio: 1,
  'radio-group': 1,
  slider: 1,
  switch: 1,
    'cover-image': 1,
    textarea: 1,
    'cover-view': 15,
    'movable-area': 1,
    'movable-view': 1,
    'scroll-view': 4,
    swiper: 4,
    'swiper-item': 4,
    navigator: 1,
    audio: 1,
    camera: 1,
    'static-image': 1,
    image: 1,
    'live-player': 1,
    video: 1,
    canvas: 1,
    ad: 1,
    'web-view': 1,
    block: 15,
    map: 1,
    slot: 8,
    'slot-view': 8,
    editor: 1,
    'match-media': 1,
    'functional-page-navigator': 1,
    'live-pusher': 1,
    'official-account': 1,
    'open-data': 1,
    'navigation-bar': 1,
    'page-meta': 1,
    'voip-room': 1,
    'ad-custom': 1,
    'page-container': 1,
    '#text': 1,
    'nav-bar': 1,
    captcha: 1,
    coupon: 1
}
