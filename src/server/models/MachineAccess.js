import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const { ObjectId } = Schema;

const MachineAccess = new Schema({
  machine: { type: ObjectId, ref: 'Machine' },
  user: { type: ObjectId, ref: 'User' },
  permission: String,
});

module.exports = mongoose.model('MachineAccess', MachineAccess);
