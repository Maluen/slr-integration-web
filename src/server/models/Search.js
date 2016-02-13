import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const { ObjectId } = Schema;

const Search = new Schema({
  project: { type: ObjectId, ref: 'Project' },
  name: String,
  settings: [{ name: String, value: String }],
  state: { type: ObjectId, ref: 'SearchState' },
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
});

module.exports = mongoose.model('Search', Search);
