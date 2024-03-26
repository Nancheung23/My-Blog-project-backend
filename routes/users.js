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
// user jwt for user login
let jwt = require('jsonwebtoken')
router.get('/', (req, res, next) => {
  console.log(req.query)
  if(req.query.username == 'admin' && req.query.password == 'admin') {
    // {data}, {encrypt}, {expires ; algorithm}
    /**
     * @example     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNzExNDYyMjgxLCJleHAiOjE3NDI5OTgyODF9.ap-jXurmE81K27wKLoVAajX9iD5gWeWB0TIUzS0UoF0"
     */
    let token = jwt.sign({ username : 'admin' }, 'test12345', {expiresIn : '365 days', algorithm : 'HS256'})
    res.json({
      code : 1,
      msg : 'Login successfully',
      // return token
      token,
    })
  } else {
    res.json({
      code : 0,
      msg : 'Login failed'
    })
  }
});

module.exports = router;
