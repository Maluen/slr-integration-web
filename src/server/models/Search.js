import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const { ObjectId } = Schema;

const Search = new Schema({
  project: { type: ObjectId, ref: 'Project' },
  name: String,
  settings: [{ name: String, value: String }],
  state: String,
});

module.exports = mongoose.model('Search', Search);
