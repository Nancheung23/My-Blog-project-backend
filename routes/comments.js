let express = require('express')
let router = express.Router()
let {Comment, Article} = require('../modules/index')

/* Create Comment */
/* /api/comments */
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
/* /api/comments/articles/:aid */
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

/* Delete Comment By Id*/
/* /api/comments/:cid */
router.delete('/:cid', async (req, res) => {
    // cid -> comment -> author
    let commentObj = await Comment.findById(req.params.cid).populate('article_id')
    let author_id = commentObj.article_id.author
    // if comment belongs to author of article
    if(author_id == req.auth.uid) {
        let r = await Comment.findByIdAndDelete(req.params.cid)
        if(r) {
            res.json({
                code : 1,
                msg : 'Delete Comment Successfully',
            })
        } else {
            res.json({
                code : 0,
                msg : 'Error: Comment Deleted Already',
            })
        }
    } else {
        res.json({
            code : 0,
            msg : 'Error: No Authorization For Delete',
        })
    }
})
module.exports = router