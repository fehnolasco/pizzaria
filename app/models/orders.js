/*
 *	Pedidos dos clientes
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var OrderSchema = new Schema({

   clientInfo: {
      type: String,
      required: true,
      trim: true
   },
   pizza: [{
         type: String,
         trim: true
      }],
   esfiha: [{
         type: String,
         trim: true
      }],
   drink: [{
         type: String,
         trim: true
      }],
   payment: [{
         type: String,
         required: true
      }],
   obs: {
      type: String,
      trim: true
   },
   ref: {
      type: String,
      trim: true,
      required: true
   },
   totalPrice: {
      type: Number,
      required: true
   },
   orderDate: {
      type: Date,
      default: Date.now
   },
   status: {
      type: Number,
      required: true
   }

});

var orders = mongoose.model('pedidos', OrderSchema);

module.exports = orders;