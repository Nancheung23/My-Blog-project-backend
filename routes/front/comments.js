let express = require('express')
let router = express.Router()
let {Comment, Article} = require('../../modules/index')

/* Create Comment */
/* /api/front/comments */
/**
 * @param req.body.article_id
 * @param req.body.content
 * @param req.auth.uid
 */
router.post('/', (req,res) => {
    Comment.create({
        reply_user_id : req.auth.uid,
        article_id : req.body.article_id,
        content : req.body.content,
    }).then(r => {
        res.json({
            code : 1,
            msg : 'Create Comment Successfully',
            data : r,
        })
    }).catch(err => {
        res.json({
            code : 0,
            msg : 'Error: Create Comment Failed',
            data : err,
        })
    })
})

/* Get Comment By Id*/
/* /api/front/comments/articles/:aid */
/**
 * @param req.params.aid
 */
router.get('/articles/:aid', (req, res) => {
    Comment.find({
        article_id : req.params.aid
    })
    .populate('reply_user_id')
    .then(r => {
        res.json({
            code : 1,
            msg : 'Get Comment Successfully',
            data : r,
        })
    }).catch(err => {
        res.json({
            code : 0,
            msg : 'Error: Get Comment Failed',
            err : err,
        })
    })
})

module.exports = router