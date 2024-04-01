var express = require('express');
var router = express.Router();
let { Article } = require('../modules/index')

/* Create Article */
/* /api/articles */
/**
 * @param req.auth.uid
 * @param req.body.title
 * @param req.body.content
 */
router.post('/', (req, res, next) => {
  // { username: 'admin', iat: 1711462281, exp: 1742998281 }
  console.log(req.body);
  console.log(req.auth);
  Article.create({
    ...req.body,
    author: req.auth.uid,
  }).then(r => {
    res.json({
      code: 1,
      msg: 'Create article successfully',
      data : r,
    })
  }).catch(err => {
    res.json({
      code: 0,
      msg: 'Error: Create article Failed',
      err: err
    })
  })
});

/* Search Articles By User Id */
/* /api/articles/users/:uid */
/**
 * @param uid
 */
router.get('/users/:uid', (req, res, next) => {
  Article.find({ author: req.params.uid })
    .populate('author', { password: 0 })
    .populate('coms')
    .then(r => {
      console.log(r);
      res.json({
        code: 1,
        msg: 'Successfully fetch article list by userId',
        data : r,
      })
    }).catch(err => {
      res.json({
        code: 0,
        msg: 'Error: Failed fetch article list by userId',
        data : err,
      })
    })
});

/* Get Article By Article Id */
/* /api/articles/:aid */
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

/* Delete Article By Article Id */
/* /api/articles/:aid */
/**
 * @param aid
 */
router.delete('/:aid', (req, res, next) => {
  Article.findByIdAndDelete(req.params.aid)
    .then(r => {
      if (r) {
        res.json({
          code: 1,
          msg: 'Successfully deleted article by articleId',
          data : r,
        })
      } else {
        res.json({
          code: 0,
          msg: 'Error: Article already deleted',
          data : err,
        })
      }
    }).catch(err => {
      res.json({
        code: 0,
        msg: 'Error: Failed deleted article by articleId',
        data: err
      })
    })
});

/* Modify Article By Article Id */
/* /api/articles/:aid */
/**
 * @param aid
 * @param req.body.title
 * @param req.body.content
 */
router.patch('/:aid', (req, res, next) => {
  console.log(req.body);
  Article.findByIdAndUpdate(req.params.aid,
    { ...req.body },
    { new: true }).then(r => {
      res.json({
        code: 1,
        msg: 'Successfully modify article by articleId',
        data: r,
      })
    }).catch(err => {
      res.json({
        code: 0,
        msg: 'Error: Failed modify article by articleId',
        err: err
      })
    })
});
module.exports = router;