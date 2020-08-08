const readFile = require('../../utils/files/readFile');
const express = require('express');
const data = express.Router();
//http://localhost:3000/api/v1/test
data.get('/test', (req, res) => {
  res.send({ msg: "data测试接口" });
});
data.get('/data', (req, res) => {
  let data = readFile('_posts/前端/JavaScript基础教程.md')
  data.then((result) => {
    res.send({ data: result });
    // console.log(result);
  }).catch((err) => {

  });
  // let data = fs.readdir('_posts', (err, files) => {
  //   if (err) {
  //     console.log(err);
  //     return;
  //   }
  //   console.log(files);
  //   // return files
  //   res.send({ 'data': files });
  // })
  // res.send({ msg: "data测试接口" });
});

module.exports = data;
