import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const Schema = mongoose.Schema;

const User = new Schema({
  email: String,
  password: String,
});

User.plugin(passportLocalMongoose, {
  usernameField: 'email',
});

module.exports = mongoose.model('User', User);
