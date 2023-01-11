const express = require('express')
const router = express.Router()
const multer = require('../middlewares/multer')
const {
  createPost,
  deletePost,
  updatePost,
} = require("../Controllers/PostController");
const { postValidator, validate} = require('../middlewares/PostValidator')
const {parseData} = require('../middlewares')

router.post('/create', 
multer.single('thumbnail'), 
parseData,
postValidator, 
validate, 
createPost)

router.put(
  "/:postID",
  multer.single("thumbnail"),
  parseData,
  postValidator,
  validate,
  updatePost
);

router.delete('/:postID', deletePost)
module.exports = router