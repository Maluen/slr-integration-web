import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Project = new Schema({
  name: String,
  settings: [{ name: String, value: String }],
});

module.exports = mongoose.model('Project', Project);
