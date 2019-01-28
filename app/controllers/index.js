var async = require('async');
var nodemailer = require('nodemailer');
var bcrypt = require('bcrypt');

var User = require('../models/users');

/*
 * Config Nodemailer
 */
var transporter = nodemailer.createTransport({
   service: 'Gmail',
   auth: {
      user: 'fnaproject1@gmail.com',
      pass: 'fefezin123'
   }
});



/*
 * GET requests
 */

exports.index = function (req, res) {
   res.render('index', {
      title: 'Nogueiras Pizzaria',
      content_title: 'nogueiras pizzaria',
      btn_register: 'Inscreva-se para solicitar pedido',
      catalog: 'possuimos uma grande variedade de sabores e combinações!',
      address: 'av. do guaca, 445',
      cep: '02435-000',
      neighbourhood: 'Lauzanne paulista',
      city: 'São Paulo',
      state: 'SP',
      tel: '(11) 1234-5678',
      cel: '(11) 9 1234-5678'
   });
};

exports.getLogin = function (req, res) {
   res.render('login', {
      title: 'Login',
      dados: 'Por Favor, insira seus dados'
   });
};

exports.getRegister = function (req, res) {
   res.render('register', {
      title: 'Registra-se',
      dados: 'Preencha os dados de forma correta',
      err: " "
   });
};

exports.gallery = function (req, res) {
   res.render('gallery', {
      title: 'Conheça nossa cozinha'
   });
};

exports.about = function (req, res) {
   res.render('about', {
      title: 'Conheça-nos um pouco mais'
   });
};

exports.user_validation = function (req, res, next) {

   var hash = req.param('hash');
   var id_ = req.param('id');


   User.findById(id_).exec(function (err, user) {

      if (err) {
         return next(err);
      } else if (hash === user.validation) {
         User.findByIdAndUpdate(id_, {active: true}, function (err) {
            if (err) {
               return next(err);
            } else {
               res.redirect(user.url);
               return;
            }
         });
      }
   });

};

/*
 * POST requests
 */

exports.postLogin = function (req, res, next) {

   var email = req.body.email,
           psw = req.body.psw;

   if (email.length < 1 && psw.length < 1) {

      var error = new Error();
      error.msg = 'Erro: por favor, preencha os campos em branco';
      error.status = 401;
      console.log(error.msg);
      res.render('login', {
         title: 'Login',
         dados: 'Por Favor, insira seus dados',
         erro: error
      });
      return;
   } else {
      User.auth(email, psw, function (err, user) {

         if (err || !user) {
            var error = new Error();
            error.msg = "Erro, usuário não encontrado";
            error.status = 401;
            console.log(error.msg);
            res.render("/login", {
               title: 'Login',
               dados: 'Por Favor, insira seus dados',
               erro: error
            });
            return;
         } else {
            req.session.userId = user._id;
            res.redirect(user.url);
            return;
         }

      });
   }

};

exports.postRegister = [

   function (req, res, next) {

      var email = req.body.email,
              name = req.body.name,
              lname = req.body.lname,
              tel = req.body.tel,
              psw = req.body.psw,
              psw_conf = req.body.psw_conf;

      if (psw < 8 || psw > 20) {
         var error = new Error('password length incorrect');
         error.msg = 'A senha de ve conter entre 8 e 20 caracteres.';
         console.log(error.msg);
         error.status = 400;
         res.render('/register', {
            title: 'Registra-se',
            dados: 'Preencha os dados de forma correta'
         });
         return;
      } else if (psw !== psw_conf) {
         var err = new Error('different passwords');
         err.msg = 'As senhas não se relacionam';
         err.status = 400;
         console.log(err.msg);
         res.render('/register', {
            title: 'Registra-se',
            dados: 'Preencha os dados de forma correta'
         });
         return;
      } else {

         var db_save = new User({
            name: name,
            last_name: lname,
            email: email,
            tel: tel,
            psw: psw,
            validation: 'dfvdfsd',
            active: false
         });

         db_save.save(function (err, user) {

            var mailOptions = {
               to: email,
               from: 'fnaproject1@gmail.com',
               subject: 'Email validation',
               html: '<p>Please, confirm your e-mail clicking on the link: </p> <br> <a href="/uservalidation?hash="' + user.email_validation + 'target="_blank">http://localhost:3000/uservalidation?id=' + user._id + '&hash=' + user.email_validation + '</a>'
            };

            if (err) {
               return next(err);
            } else {
               transporter.sendMail(mailOptions, function (err) {

                  if (err) {
                     return next(err);
                  } else {
                     req.session.userId = user._id;
                     res.redirect(user.url);
                     return;
                  }
               });
            }
         });


      }


   }

];

exports.logout = function (req, res, next) {

   if (req.session) {

      req.session.destroy(function (err) {

         if (err) {
            return next(err);
         } else {
            res.redirect('/');
            return;
         }
      });

   }

};
