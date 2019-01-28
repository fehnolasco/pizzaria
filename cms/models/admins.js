var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var adminSchema = new mongoose.Schema({

   first_name: {
      type: String,
      required: true,
      min: 1,
      trim: true
   },
   last_name: {
      type: String,
      required: true,
      min: 1,
      trim: true
   },
   email: {
      type: String,
      required: true,
      min: 1,
      unique: true,
      trim: true
   },
   password: {
      type: String,
      min: 1,
      trim: true
   }

});

adminSchema.virtual('url').get(function () {
   return '/admin/' + this._id;
});

adminSchema.pre('save', function (next) {

   var user = this;
   bcrypt.genSalt(10, function (err, salt) {

      if (err) {
         return next(err);
      } else {

         bcrypt.hash(user.password, salt, function (err, hash) {

            if (err) {
               return next(err);
            } else {
               user.password = hash;
               return next();
            }

         });

      }

   });

});



adminSchema.statics.auth = function (email, password, callback) {

   $adm.findOne({email: email}).exec(function (err, same_user) {

      if (err) {
         return callback(err);
      } else if (!same_user) {
         err = new Error("td errado");
         return callback(err);
      }

      bcrypt.compare(password, same_user.password, function (err, ok) {

         if (ok) {
            return callback(null, same_user);
         } else {
            return callback;
         }

      });

   });

};

var $adm = mongoose.model('admin', adminSchema);
module.exports = $adm;