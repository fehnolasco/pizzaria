var bcrypt = require('bcrypt');

var Admins = require('../models/admins');


/*
 * GET requests
 */

exports.index = function (req, res, next) {

   res.redirect('/admin/auth');

};

exports.getLogin = function (req, res, next) {

   res.render('admLogin');

};

exports.getSignup = function (req, res, next) {

   res.render('admSignup');

};

exports.adminDetail = function (req, res, next) {

   res.send("logged " + req.session.admId);

};


/*
 *	POST requests
 */

exports.postLogin = function (req, res, next) {

   var email = req.body.email,
           psw = req.body.psw;

   Admins.auth(email, psw, function (err, adm) {

      if (err || !adm) {
         return next(err);
      } else {
         req.session.admId = adm._id;
         res.redirect(adm.url);
         return;
      }

   });

};

exports.postSignup = [

   function (req, res, next) {

      var email = req.body.email,
              psw = req.body.psw,
              fname = req.body.fname,
              lname = req.body.lname;

      var db = new Admins({
         first_name: fname,
         last_name: lname,
         email: email,
         password: psw
      });

      db.save(function (err, admin) {

         if (err) {
            return next(err);
         } else {
            req.session.admId = admin._id;
            res.redirect(admin.url);
            return;
         }

      });

   }

];
