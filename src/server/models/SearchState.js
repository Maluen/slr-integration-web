import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const { ObjectId } = Schema;

const SearchState = new Schema({
  status: String,
  machine: { type: ObjectId, ref: 'Machine' },
  output: [{ line: String, timestamp: Number }],
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
});

module.exports = mongoose.model('SearchState', SearchState);
