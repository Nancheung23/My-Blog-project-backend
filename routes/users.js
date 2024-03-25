var express = require('express');
var router = express.Router();

/* Register request */
/* /api/users */
/**
 * @param req.body.username
 * @param req.body.password
 * @param req.body.nickname
 */
router.post('/', (req, res, next) => {
  console.log(req.body);
  res.json({
    code : 1,
    msg : 'Register successfully'
  })
});

/* Login request */
/* /api/users */
/**
 * @param req.params.username
 * @param req.params.password
 */
router.get('/', (req, res, next) => {
  console.log(req.query);
  res.json({
    code : 1,
    msg : 'Login successfully'
  })
});

module.exports = router;
