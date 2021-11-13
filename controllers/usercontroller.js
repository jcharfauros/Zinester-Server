const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Router } = require("express");
const { User } = require("../models");
// const validateSession = require("../middleware/validate-session");

const router = Router();

router.post('/signup', function (req, res) {
  User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    email: req.body.email,
    passwordhash: bcrypt.hashSync(req.body.passwordhash, 5),
    isZinester: req.body.isZinester,   
  })
    .then(function createSuccess(user) {
      let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { 
        expiresIn: 60 * 60 * 24,
      });
      res.json({
        user: user,
        message: 'User successfully signed up',
        sessionToken: token,
      });
    })
    .catch(function(err) {
      res.status(500).json({ error: err });
    });
});

router.post('/login', function (req, res) {
  User.findOne({
    where: { 
      email: req.body.email,
     },
  })
    .then(function loginSuccess(user) {
      if (user) {
        bcrypt.compare(
          req.body.passwordhash,
          user.passwordhash,
          function (err, matches) {
            if (matches) {
              let token = jwt.sign(
                // { id: user.id, username: user.username },
                { id: user.id }, 
                process.env.JWT_SECRET, 
                { 
                  expiresIn: 60 * 60 * 24,
                }
              );
              res.status(200).json({
                user: user,
                message: 'Woohoo, user is logged in!',
                sessionToken: token,
              });
            } else {
              res.status(502).send({
                error: 'Boo, password does not match!'
              });
            }
          });
      } else { 
        res.status(500).json({ 
          error: 'User does not exist.'
        });
      }
    })
    .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;