var express = require('express');
var router = express.Router();
// implement mongoose modules
let { User } = require('../modules/index')

/* Register request */
/* /api/users */
/**
 * @param req.body.username
 * @param req.body.password
 * @param req.body.nickname
 * @param req.body.headImgUrl
 */
router.post('/', (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;
  let nickname = req.body.nickname;
  let headImgUrl = req.body.headImgUrl;
  if (!username || !password || !nickname || !headImgUrl) {
    res.json({
      code: 0,
      msg: 'Register failed -- Lacking of args'
    });
    return;
  } else {
    // create user in db
    User.create(req.body).then(r => {
      console.log(req.body);
      res.json({
        code: 1,
        msg: 'Register Successfully'
      });
    }).catch(err => {
      console.log(req.body);
      res.json({
        code: 0,
        msg: 'Register failed -- Duplicated username',
        err : err
      });
    })
  }
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
  let { username, password } = req.query;
  User.findOne({ username, password }).then(r => {
    console.log(r);
    if (r == null) {
      res.json({
        code: 0,
        msg: 'Login failed'
      })
    } else {
      // {data}, {encrypt}, {expires ; algorithm}
      /**
       * @example     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNzExNDYyMjgxLCJleHAiOjE3NDI5OTgyODF9.ap-jXurmE81K27wKLoVAajX9iD5gWeWB0TIUzS0UoF0"
       */
      let token = jwt.sign({ username: username }, 'test12345', { expiresIn: '365 days', algorithm: 'HS256' })
      res.json({
        code: 1,
        msg: 'Login successfully',
        // return token
        token,
      })
    }
  })
})

module.exports = router;
