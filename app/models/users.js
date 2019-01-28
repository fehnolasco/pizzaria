var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var Schema = mongoose.Schema;

var userSchema = new Schema({

   orderHistory: [{
      type: Object
      }],
   name: {
      type: String,
      required: true,
      min: 1,
      trim: true
   },
   last_name: {
      type: String,
      min: 1,
      required: true,
      trim: true
   },
   email: {
      type: String,
      required: true,
      unique: true,
      trim: true
   },
   tel: {
      type: String,
      required: true,
      trim: true
   },
   psw: {
      type: String,
      required: true,
      trim: true,
      min: 8,
      max: 20
   },
   active: {
      type: Boolean
   },
   validation: {
      type: String
   },
   cart: {
      type: Object
   }
});

/*
 *  Some virtuals to help
 */

userSchema.virtual('url').get(function () {
   return '/user/' + this._id;
});

userSchema.virtual('ola').get(function () {
   return this.last_name + ', ' + this.name;
});

userSchema.virtual('email_validation').get(function () {
   return this.validation;
});



/*
 * Password validation and generating hash for e-mail validation
 */

userSchema.pre('save', function (next) {

   var user = this;
   bcrypt.genSalt(10, function (err, salt) {

      if (err) {
         return next(err);
      }

      bcrypt.hash(user.psw, salt, function (err, hash) {

         if (err) {
            return next(err);
         } else {
            user.psw = hash;
            return next();
         }
      });

   });
   userSchema.pre('save', function (next) {

      var user = this;
      bcrypt.genSalt(10, function (err, salt) {

         if (err) {
            return next(err);
         }
         bcrypt.hash(user.validation, salt, function (err, hash) {

            if (err) {
               return next(err);
            } else {
               user.validation = hash;
               return next();
            }
         });
      });

   });
});

/*
 * Login's function bind
 */

userSchema.statics.auth = function (email, password, callback) {

   $user.findOne({
      email: email
   }).exec(function (err, same_user) {

      if (err) {
         return callback(err);
      } else if (!same_user) {
         var error = new Error("Erro: email ou senha errados!");
         error.status = 401;
         return callback(error);
      }

      bcrypt.compare(password, same_user.psw, function (err, ok) {

         if (ok) {
            return callback(null, same_user);
         } else {
            return callback;
         }

      });

   });

};

var $user = mongoose.model('consumidores', userSchema);
module.exports = $user;
