import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const { ObjectId } = Schema;

const MachineAccess = new Schema({
  machine: ObjectId,
  user: ObjectId,
  permission: String,
});

module.exports = mongoose.model('MachineAccess', MachineAccess);
