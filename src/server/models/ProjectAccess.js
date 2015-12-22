import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const { ObjectId } = Schema;

const ProjectAccess = new Schema({
  project: { type: ObjectId, ref: 'Project' },
  user: { type: ObjectId, ref: 'User' },
  permission: String,
});

module.exports = mongoose.model('ProjectAccess', ProjectAccess);
