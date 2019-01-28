
var User = require('../models/users');

var Pizza = include('cms/models/pizza');
var Esfirra = include('cms/models/esfirra');
var Bebida = include('cms/models/bebidas');


/* 
 *  GET User Detail
 */


// Index user
exports.user_detail = function (req, res, next) {

   User.findById(req.session.userId).exec(function (err, user) {

      if (err) {
         return next(err);
      } else if (user === null) {
         var error = new Error('Not Authorized');
         error.status = 400;
         res.redirect('/login');
         return;
      } else {
         res.render('user', {
            mail: user.email,
            name: user.ola,
            cart: user.cart
         });
         return;
      }

   });

};

// Products
exports.user_showProducts = function (req, res, next) {

   Pizza.find({}).exec(function (err, result) {

      var i = 0;
      if (err || !result) {
         return next(err);
      } else {

         do {
            if (typeof result[i] === "object") {
               res.json({
                  id: result[i].id,
                  name: result[i].name,
                  price: result[i].price,
                  flavor: result[i].flavor,
                  description: result[i].description
               });
               i++;
            } else {
               res.send("Sem resultado");
               i++;
            }
         } while (i < result.length);

      }

   });

   Esfirra.find({}).exec(function (err, result) {

      var i = 0;
      if (err || !result) {
         return next(err);
      } else {

         do {
            if (typeof result[i] === "object") {
               res.json({
                  id: result[i].id,
                  name: result[i].name,
                  price: result[i].price,
                  flavor: result[i].flavor,
                  description: result[i].description
               });
               i++;
            } else {
               res.send("Sem resultado");
               i++;
            }
         } while (i < result.length);

      }

   });

   Bebida.find({}).exec(function (err, result) {

      var i = 0;
      if (err || !result) {
         return next(err);
      } else {

         do {
            if (typeof result[i] === "object") {
               res.json({
                  id: result[i].id,
                  name: result[i].name,
                  price: result[i].price,
                  flavor: result[i].flavor,
                  description: result[i].description,
                  genre: result[i].genre,
                  alcool: result[i].alcool
               });
               i++;
            } else {
               res.send("Sem resultado");
               i++;
            }
         } while (i < result.length);

      }

   });

};




/* 
 *  POST User Detail
 */

// Add products to cart
exports.user_addToCart = function (req, res, next){
   
  var productId = req.query.productId,
      productType = req.query.productType;
  
  User.findByIdAndUpdate(req.session.userId).exec(function(err, user){
     
     if(err || !user){
        var error = new Error();
        error.status = 400;
        res.send(error.status);
        return next();
     }else {
        user.cart = {
           productId: productId,
           productType: productType
        };
        user.save(function(err){
           
           if(err){
              next(err);
           }else {
              res.send(200);
           }
        });
        return next();
     }
     
  });
   
};