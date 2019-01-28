var mongoose = require('mongoose');

var EsfirraSchema = new mongoose.Schema({

   id: {
      type: String,
      required: true,
      unique: true,
      trim: true
   },
   name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      max: 25
   },
   price: {
      type: Number,
      required: true,
      trim: true
   },
   flavor: {
      type: String,
      required: true,
      trim: true,
      max: 50
   },
   description: {
      type: String,
      trim: true,
      max: 140
   },
   img: {
      data: Buffer,
      contentType: String
   }

});


module.exports = mongoose.model('esfirra', EsfirraSchema);

