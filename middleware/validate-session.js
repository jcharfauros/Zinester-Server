const jwt = require("jsonwebtoken");
const { User } = require("../models");
// const User = require('../db').import('../models/user');

const validateSession = (req, res, next) => {
  // Build your validation for token here
  const token = req.headers.authorization;
  //console test
  // console.log('this is a token -->', token);

  if (!token) {
    return res
      .status(403)
      .send({ auth: false, message: 'OOPS! No token provided!!' });
  } else {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodeToken) => {
      //console test
      // console.log('decodeToken right hurrr -->', decodeToken);
      
      if (!err && decodeToken) {
        User.findOne({
          where: { 
            id: decodeToken.id,
           },
        })
        .then((user) => {
          //console test
          // console.log('hello my pretty user -->', user);

          if (!user) throw err;
          //console test
          // console.log('req -->', req);
          req.user = user;
          return next();
        })
        .catch((err) => next(err));
      } else {
        req.errors = err;
        return res.status(500).send('Not Authorized');
      }
    });
  }
};

module.exports = validateSession;
