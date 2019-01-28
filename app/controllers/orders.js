

var Orders = require('../models/orders');
var User = require('../models/users');


/*
 * GET ORDERS
 */


exports.getOrder = function (req, res, next) {

   res.json({
      hi: "hi"
   });

};



/*
 * POST ORDERS
 */


exports.postConfirmOrder = [

   function (req, res, next) {

      var consumer_id = req.session.userId;
      var order_pizza = req.query.pizzaId;
      var order_drink = req.query.drinkId;
      var order_esfiha = req.query.esfihaId;
      var order_payment = req.query.payment;
      var order_obs = req.query.obs;
      var order_ref = req.query.ref;
      var order_totalPrice = req.query.totalPrice;
      var order_Date = Date.now;


      if (order_pizza === "")
      {
         order_pizza = "0";
      } else if (order_drink === "")
      {
         order_drink = "0";
      } else if (order_esfiha === "")
      {
         order_esfiha = "0";
      } else if (order_obs === "")
      {
         order_obs === "0";
      }

      var $order_detail = new Orders({
         clientInfo: consumer_id,
         pizza: order_pizza,
         drink: order_drink,
         esfiha: order_esfiha,
         payment: order_payment,
         obs: order_obs,
         ref: order_ref,
         totalPrice: order_totalPrice,
         order_Date: order_Date,
         status: 1
      });


      $order_detail.save(function (err) {

         if (err) {
            return next(err);
         }

      });

      Orders.find({clientInfo: consumer_id}, function (err, order) {

         if (err || !order) {
            return next(err);
         } else {

            User.findByIdAndUpdate(consumer_id, {order_History:{orderId: order._id, orderDate: order.order_Date, orderPrice: order.totalPrice}}, function (err, user) {

               if (err) {
                  return next(err);
               } else {

                  user.cart = {};
                  user.save(function (err) {

                     if (err) {
                        return next(err);
                     } else {
                        res.send("Pedido confirmado, favor esperar");
                     }

                  });

               }

            });

         }

      });

   }

];