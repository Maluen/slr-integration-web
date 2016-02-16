import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const { ObjectId } = Schema;

const SearchState = new Schema({
  status: String,
  machine: { type: ObjectId, ref: 'Machine' },
  output: [{ line: String, timestamp: Number }],
  created_at: { type: Number },
  updated_at: { type: Number },
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
});

SearchState.pre('save', function preSave(next) {
  const now = Date.now();
  this.updated_at = now;
  if (!this.created_at) this.created_at = now;
  next();
});

module.exports = mongoose.model('SearchState', SearchState);
