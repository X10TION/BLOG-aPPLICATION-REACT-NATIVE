const express = require('express')
const router = express.Router()
const multer = require('../middlewares/multer')
const { createPost } = require('../Controllers/PostController')
const { postValidator, validate} = require('../middlewares/PostValidator')
const {parseData} = require('../middlewares')

router.post('/create', 
multer.single('thumbnail'), 
parseData,
postValidator, 
validate, 
createPost)


module.exports = router