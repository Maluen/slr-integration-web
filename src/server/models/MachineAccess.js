import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const { ObjectId } = Schema;

const MachineAccess = new Schema({
  machine: { type: ObjectId, ref: 'Machine' },
  user: { type: ObjectId, ref: 'User' },
  permission: String,
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
});

module.exports = mongoose.model('MachineAccess', MachineAccess);
