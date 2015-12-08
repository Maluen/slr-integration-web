import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Machine = new Schema({
  hostname: String,
  port: String,
});

module.exports = mongoose.model('Machine', Machine);
