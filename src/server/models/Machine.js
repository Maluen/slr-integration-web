import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Machine = new Schema({
  name: String,
  hostname: String,
  port: String,
});

module.exports = mongoose.model('Machine', Machine);
