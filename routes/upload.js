// set upload router
let express = require('express')
let router = express.Router()
// multer & path
let multer = require('multer')
let path = require('path')
// set upload file directory
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // save dest
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        // file rename (timestamp + originalname)
        cb(null, Date.now() + path.extname(file.originalname))
    }
})
// create upload (once 1 pic upload)
let upload = multer({storage : storage}).single('img')

/* upload */
/**
 * @file req.file
 * @example imgUrl : /images/1711461154404.png
 */
router.post('/', upload, (req, res) => {
    let file = req.file
    console.log(file)
    let imgUrl = "/images/" + file.filename
    res.json({
        code: 1,
        msg: 'Successfully upload img',
        data: imgUrl
    })
})

module.exports = router