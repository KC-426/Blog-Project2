const express = require('express')
const multer = require('multer')
var upload = multer({storage: multer.memoryStorage()})

const blogController = require('../controllers/blog')

const router = express.Router()

router.post('/create', upload.single('file'), blogController.createBlog)

router.get('/retrieve', blogController.retrieveBlog)

router.put('/updated', blogController.updateBlog)

router.get('/delete', blogController.deleteBlog)

module.exports = router