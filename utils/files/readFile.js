const fs = require('fs')
const path = require('path');
const MarkdownIt = require('markdown-it'),
  md = new MarkdownIt();


function readFile(params) {
  //需要注意的是fs是异步,所以需要return new Promise
  return new Promise((resolve, reject) => {
    // 读取md文件
    fs.readFile(params, 'utf8', (err, data) => {
      if (err) {
        // console.log(err)
        reject(err)
      } else {
        let result = md.render(data)
        console.log('md文件读取的结果' + result)
        resolve(result)
        //  // 处理组件名称首字母大写
        // A-coder-beauty应为ACoderBeauty
        // 处理md文件名，去掉前面的路径和文件类型后缀
        let filename = params.replace(__dirname, '')
        let startIndex = filename.lastIndexOf('\\')
        let endIndex = filename.indexOf('.')
        filename = filename.substring(startIndex + 1, endIndex)

      }
    })
  });
}
module.exports = {
  readFile
};
