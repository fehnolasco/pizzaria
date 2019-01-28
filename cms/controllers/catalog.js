var Pizza = require('../models/pizza');
var Esfirra = require('../models/esfirra');
var Bebidas = require('../models/bebidas');



/*
 * GET for catalog constructor
 */

exports.listPizza = function (req, res, next) {

   Pizza.find({}).exec(function (err, result) {

      var i = 0;

      if (err || !result) {
         err = new Error("Algo inesperado aconteceu");
         err.status = '400';
         res.json(
                 {
                    error: err,
                    status: 400
                 }
         );
         return;
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
               res.send("Você ainda não adicionou nada!");
               i++;
            }
         } while (i < result.length);
      }


   });

};

exports.listEsfiha = function (req, res, next) {

   Esfirra.find({}).exec(function (err, result) {

      var i = 0;

      if (err || !result) {
         err = new Error("Algo inesperado aconteceu");
         err.status = '400';
         res.json(
                 {
                    error: err,
                    status: 400
                 }
         );

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
               res.send("Você ainda não adicionou nada!");
               i++;
            }
         } while (i < result.length);
      }

   });

};

exports.listDrinks = function (req, res, next) {

   Bebidas.find({}).exec(function (err, result) {

      var i = 0;

      if (err || !result) {
         err = new Error("Algo inesperado aconteceu");
         err.status = '400';
         res.json(
                 {
                    error: err,
                    status: 400
                 }
         );
      } else {

         do {

            if (typeof result[i] === "object") {
               res.send({
                  id: result[i].id,
                  name: result[i].name,
                  price: result[i].price,
                  flavor: result[i].flavor,
                  description: result[i].description,
                  genre: result[i].genre,
                  alcool: result[i].alcool
               });
               console.log(result[i]);
               i++;
            } else {
               res.send("Você ainda não adicionou nada!");
               i++;
            }
            console.log(i);
         } while (i < result.length);

      }

   });

};

exports.getPizza = function (req, res, next) {

   res.send("here lives pizza's form");

};

exports.getEsfiha = function (req, res, next) {

   res.send("here lives esfirras's form");

};

exports.getDrinks = function (req, res, next) {

   res.send("here lives drink's form");

};

exports.getUpdatePizza = function (req, res, next) {
   res.send("here lives pizza's update form");
};

exports.getUpdateEsfiha = function (req, res, next) {
   res.send("here lives esfiha's update form");
};

exports.getUpdateDrinks = function (req, res, next) {
   res.send("here lives drink's update form");
};

exports.getDeletePizza = function (req, res, next) {
   res.send("here lives pizza's delete method");
};

exports.getDeleteEsfiha = function (req, res, next) {
   res.send("here lives esfiha's delete method");
};

exports.getDeleteDrinks = function (req, res, next) {
   res.send("here lives drink's delete mehod");
};

/*
 * POST requests to create items to catalog
 */

// Add pizza to catalog
exports.postPizza = [

   function (req, res, next) {

      var id = req.body.id,
              name = req.body.name,
              price = req.body.price,
              flavor = req.body.flavor,
              description = req.body.description,
              img = req.body.img;

      var pizza = new Pizza({
         id: id,
         name: name,
         price: price,
         flavor: flavor,
         description: description,
         img: img
      });

      pizza.save(function (err) {

         if (err) {
            var error = new Error();
            res.send(error);
            return;
         } else {
            res.send('saved');
            return;
         }

      });

   }

];

//Add esfiha to catalog
exports.postEsfiha = [

   function (req, res, next) {

      var id = req.body.id,
              name = req.body.name,
              price = req.body.price,
              flavor = req.body.flavor,
              description = req.body.description,
              img = req.body.img;

      var esfirra = new Pizza({
         id: id,
         name: name,
         price: price,
         flavor: flavor,
         description: description,
         img: img
      });

      esfirra.save(function (err) {

         if (err) {
            var error = new Error();
            res.send(error);
            return;
         } else {
            res.send('saved');
            return;
         }

      });

   }

];

//Add drinks to catalog
exports.postDrinks = [

   function (req, res, next) {

      var id = req.body.id,
              name = req.body.name,
              price = req.body.price,
              genre = req.body.genre,
              alcool = req.body.alcool,
              description = req.body.description,
              img = req.body.img;

      var drinks = new Bebidas({
         id: id,
         name: name,
         price: price,
         genre: genre,
         alcool: alcool,
         description: description,
         img: img
      });

      drinks.save(function (err) {

         if (err) {
            var error = new Error();
            res.send(error);
            return;
         } else {
            res.send('saved');
            return;
         }

      });

   }

];


/*
 * POST requests to update items from catalog
 */


//Update Pizza
exports.postUpdatePizza = [

   function (req, res, next) {

      var id = req.body.id,
              name = req.body.name,
              price = req.body.price,
              flavor = req.body.flavor,
              description = req.body.description,
              img = req.body.img;

      var newPizza = new Pizza({
         id: id,
         name: name,
         price: price,
         flavor: flavor,
         description: description,
         img: img
      });

      Pizza.findByIdAndUpdate(req.params.id, newPizza, {}, function (err) {

         if (err) {
            var error = new Error();
            res.send(error);
            return;
         } else {
            res.redirect('/catalog/pizza');
            return;
         }

      });

   }

];

exports.postUpdateEsfiha = [

   function (req, res, next) {

      var id = req.body.id,
              name = req.body.name,
              price = req.body.price,
              flavor = req.body.flavor,
              description = req.body.description,
              img = req.body.img;

      var newEsfiha = new Esfirra({
         id: id,
         name: name,
         price: price,
         flavor: flavor,
         description: description,
         img: img
      });

      Esfirra.findByIdAndUpdate(req.params.id, newEsfiha, {}, function (err) {

         if (err) {
            var error = new Error();
            res.send(error);
            return;
         } else {
            res.redirect('/catalog/esfirra');
            return;
         }

      });

   }

];

exports.postUpdateDrinks = [

   function (req, res, next) {

      var id = req.body.id,
              name = req.body.name,
              price = req.body.price,
              flavor = req.body.flavor,
              description = req.body.description,
              img = req.body.img;

      var newDrinks = new Bebidas({
         id: id,
         name: name,
         price: price,
         flavor: flavor,
         description: description,
         img: img
      });

      Bebidas.findByIdAndUpdate(req.params.id, newDrinks, {}, function (err) {

         if (err) {
            var error = new Error();
            res.send(error);
            return;
         } else {
            res.redirect('/catalog/bebida');
            return;
         }

      });

   }

];

/*
 * POST requests to delete items from catalog
 */

exports.postDeletePizza = function (req, res, next) {

   Pizza.findByIdAndRemove(req.params.id).exec(function (err) {

      if (err) {
         var error = new Error();
         res.send(error);
         return;
      } else {
         res.send("successfully deleted");
      }

   });

};

exports.postDeleteEsfiha = function (req, res, next) {

   Esfirra.findByIdAndRemove(req.params.id).exec(function (err) {

      if (err) {
         var error = new Error();
         res.send(error);
         return;
      } else {
         res.send("successfully deleted");
      }

   });

};

exports.postDeleteDrinks = function (req, res, next) {

   Bebidas.findByIdAndRemove(req.params.id).exec(function (err) {

      if (err) {
         var error = new Error();
         res.send(error);
         return;
      } else {
         res.send("successfully deleted");
      }

   });

};