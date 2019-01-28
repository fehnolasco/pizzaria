var mongoose = require('mongoose');

var BebidasSchema = new mongoose.Schema({

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
   genre: {
      type: String,
      required: true,
      trim: true,
      max: 50
   },
   alcool: {
      type: String,
      required: true,
      trim: true,
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

module.exports = mongoose.model("bebidas", BebidasSchema);

 