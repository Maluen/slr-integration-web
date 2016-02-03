import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const { ObjectId } = Schema;

const Search = new Schema({
  project: { type: ObjectId, ref: 'Project' },
  name: String,
});

module.exports = mongoose.model('Search', Search);
