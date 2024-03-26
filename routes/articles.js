var express = require('express');
var router = express.Router();

/* Create Article */
/* /api/articles */
/**
 * @param req.body.userid
 * @param req.body.title
 * @param req.body.content
 */
router.post('/', (req, res, next) => {
  console.log(req.body);
  // { username: 'admin', iat: 1711462281, exp: 1742998281 }
  console.log(req.auth);
  res.json({
    code : 1,
    msg : 'Create article successfully'
  })
});

/* Search Articles By User Id */
/* /api/articles/users/:uid */
/**
 * @param uid
 */
router.get('/users/:uid', (req, res, next) => {
  console.log(req.query);
  res.json({
    code : 1,
    msg : 'Successfully fetch article list by userId'
  })
});

/* Get Article By Article Id */
/* /api/articles/:aid */
/**
 * @param aid
 */
router.get('/:aid', (req, res, next) => {
  console.log(req.body);
  res.json({
    code : 1,
    msg : 'Successfully fetch article by articleId'
  })
});

/* Delete Article By Article Id */
/* /api/articles/:aid */
/**
 * @param aid
 */
router.delete('/:aid', (req, res, next) => {
  console.log(req.body);
  res.json({
    code : 1,
    msg : 'Successfully fetch article by articleId'
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
  res.json({
    code : 1,
    msg : 'Successfully fetch article by articleId'
  })
});
module.exports = router;