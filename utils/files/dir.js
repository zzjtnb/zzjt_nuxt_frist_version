const fs = require('fs')
const path = require('path');
const MarkdownIt = require('markdown-it'),
  md = new MarkdownIt();
let pathName = '../_posts/测试'
// md文件路径
// let mdPath = path.join(__dirname, pathName)
// // fielder其实是循环读取的，这里仅做参考一下
// let filename = "前端"
// let fielder = path.join(mdPath, filename)
// console.log(fielder);

// fileDisplay(mdPath)
function fileDisplay(mdPath) {
  //根据文件路径读取文件，返回文件列表
  fs.readdir(mdPath, function (err, files) {
    if (err) {
      console.warn(err)
    } else {
      console.log(files);
      //遍历读取到的文件列表
      files.forEach(function (filename) {
        //获取当前文件的绝对路径
        var fielder = path.join(mdPath, filename)
        //根据文件路径获取文件信息，返回一个fs.Stats对象
        fs.stat(fielder, function (error, stats) {
          if (error) {
            console.warn('获取文件stats失败')
          } else {
            var isFile = stats.isFile() //是文件
            var isDir = stats.isDirectory() //是文件夹
            if (isFile) {
              //对文件的相关操作
              // console.log(fielder);
              // 读取md文件
              fs.readFile(fielder, 'utf8', (err, data) => {
                if (err) {
                  console.log(err)
                } else {
                  let result = md.render(data)
                  console.log('md文件读取的结果' + result)
                  //  // 处理组件名称首字母大写
                  // A-coder-beauty应为ACoderBeauty

                  // 处理md文件名，去掉前面的路径和文件类型后缀
                  let filename = fielder.replace(__dirname, '')
                  let startIndex = filename.lastIndexOf('\\')
                  let endIndex = filename.indexOf('.')
                  filename = filename.substring(startIndex + 1, endIndex)

                  let name = path.join('database', filename + '.html')
                  fs.writeFile(name, result + "\n", (err) => {
                    if (err) {
                      console.log(err);
                      return;
                    };
                    console.log("创建写入文件成功");
                  });
                }
              })

            }
            if (isDir) {
              fileDisplay(fielder) //递归，如果是文件夹，就继续遍历该文件夹下面的文件
            }
          }
        })
      })
    }
  })
}
module.exports = fileDisplay