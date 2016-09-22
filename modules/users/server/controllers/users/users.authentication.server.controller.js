'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  request = require('request'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

// URLs for which user can't be redirected on signin
var noReturnUrls = [
  '/authentication/signin',
  '/authentication/signup'
];

/**
 * Signin after passport authentication
 */
exports.signin = function (req, res, next) {
  request({
    headers: {
        'Content-Type': 'application/json'
      },
      url: 'https://newsuk.oktapreview.com/api/v1/authn', //URL to hit
      method: 'POST',
      json: {
          username: req.body.username.trim(),
          password: req.body.password.trim()
      }
  }, function(error, response, body){
      // if (error || !user) {
      //   res.status(400).send(info);
      // }
      if(error) {
        res.status(400).send({'success':false, 'message': error, 'type': 'connection failed'});
      } else {
        if(body.errorCode) {
          res.status(400).json({'success':false, 'message': 'Username or password is incorrect','context': body.errorSummary});
        } else {
          res.json({'success':true, 'message':body._embedded.user.profile, 'token': '1234'});
        }
    }
  });
  // passport.authenticate('local', function (err, user, info) {
  //   if (err || !user) {
  //     res.status(400).send(info);
  //   } else {
  //     // Remove sensitive data before login
  //     user.password = undefined;
  //     user.salt = undefined;

  //     req.login(user, function (err) {
  //       if (err) {
  //         res.status(400).send(err);
  //       } else {
  //         res.json(user);
  //       }
  //     });
  //   }
  // })(req, res, next);
};

/**
 * Signout
 */
exports.signout = function (req, res) {
  req.logout();
  res.redirect('/');
};
