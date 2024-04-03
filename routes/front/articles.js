var express = require('express');
var router = express.Router();
let { Article } = require('../../modules/index')

/* Search Articles */
/* /api/front/articles/ */
/**
 * @param req.query.pagesize default 10
 * @param req.query.pagenum default 1
 */
router.get('/', (req, res, next) => {

  let pagesize = req.query.pagesize || 10
  let pagenum = req.query.pagenum || 1
  Article.find()
    .populate('author', { password: 0 })
    .populate('coms')
    // split pages
    .skip((pagenum - 1) * pagesize)
    .limit(pagesize)
    .then(r => {
      console.log(r);
      res.json({
        code: 1,
        msg: 'Successfully fetch article list',
        data : r,
      })
    }).catch(err => {
      res.json({
        code: 0,
        msg: 'Error: Failed fetch article list',
        data : err,
      })
    })
});

/* Get Article By Article Id */
/* /api/front/articles/:aid */
/**
 * @param aid
 */
router.get('/:aid', (req, res, next) => {
  Article.findByIdAndUpdate(
    req.params.aid,
    // views ++
    { $inc: { views: 1 } },
    // latest
    { new: true }
  ).populate('author', { password: 0 })
    .populate('coms').then(r => {
      res.json({
        code: 1,
        msg: 'Successfully fetch article by articleId',
        data : r,
      })
    }).catch(err => {
      res.json({
        code: 0,
        msg: 'Error: Failed fetch article by articleId',
        data: err
      })
    })
});

module.exports = router;