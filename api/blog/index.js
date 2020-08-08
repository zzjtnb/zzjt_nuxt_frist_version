const readDir = require('../../utils/files/dir');
const express = require('express');
const app = express.Router();
//return blog related contents
var blogPath = "_posts";
app.get("/blog", (req, res) => {
  // allow cross orign access
  let json = {};// result to be returned
  res.header('Access-Control-Allow-Origin', '*');
  json.data = readDir.readDirSync(blogPath)

  var qSlug = req.query.slug || "";
  var qTag = req.query.tag || "";
  var qImg = req.query.img || "";
  var qIsMD = req.query.ismd == "true";
  var qIsDev = req.query.isdev == "true";

  // if (qSlug) {// with blog slug query
  //   json = singleBlog(`${blogPath}\\${realSlug(qSlug, isSlugUseDate)}`, qSlug, true, qIsMD, qIsDev);
  //   for (let k = 0; k < files.length; k++) {// add prev and next blog
  //     if (qSlug == linkSlug(files[k])) {
  //       if (k === 0) {
  //         json.next = linkSlug(files[k + 1]);
  //       } else if (k === files.length - 1) {
  //         json.prev = linkSlug(files[k - 1]);
  //       } else {
  //         json.prev = linkSlug(files[k - 1]);
  //         json.next = linkSlug(files[k + 1]);
  //       }
  //     }
  //   }
  // } else if (qTag) {// with tag query
  //   if (qTag == "all_tags") {// returns list of all available tags
  //     json.tags = {};
  //     for (let i = 0; i < files.length; i++) {
  //       let blogPost = singleBlog(blogPath + "\\" + files[i], linkSlug(files[i]));
  //       let tags = blogPost.tags || ['none'];
  //       let entry = {
  //         title: blogPost.title,
  //         slug: blogPost.slug
  //       };
  //       for (let j = 0; j < tags.length; j++) {
  //         if (json.tags[tags[j]]) {
  //           json.tags[tags[j]]++;
  //         } else {
  //           json.tags[tags[j]] = 1;
  //         }
  //       }
  //     }
  //   } else {// returns blog list of specific tag
  //     json.blogs = [];
  //     for (let i = 0; i < files.length; i++) {
  //       let blogPost = singleBlog(blogPath + "\\" + files[i], linkSlug(files[i]));
  //       let tags = blogPost.tags || ['none'];
  //       let entry = {
  //         title: blogPost.title,
  //         slug: blogPost.slug
  //       };
  //       for (let j = 0; j < tags.length; j++) {
  //         if (tags[j] == qTag) {
  //           json.blogs.unshift(blogPost);
  //         }
  //       }
  //     }
  //   }
  // } else if (qImg) {// with img query
  //   if (qImg == "all_imgs") {
  //     json.imgs = {};
  //     var imgFolders = fs.readdirSync(imgPath);
  //     for (let i = 0; i < imgFolders.length; i++) {
  //       let imgs = fs.readdirSync(imgPath + "\\" + imgFolders[i]);
  //       json.imgs[imgFolders[i]] = imgs;
  //     }
  //   }
  // } else {//without requirement, returns list of all blogs
  //   json.blogs = [];
  //   for (let i = 0; i < files.length; i++) {
  //     let blogPost = singleBlog(blogPath + "\\" + files[i], linkSlug(files[i], isSlugUseDate));
  //     json.blogs.unshift(blogPost);
  //   }
  // }
  res.json(json);
  console.log(111);
  json = {}
});
module.exports = app;
