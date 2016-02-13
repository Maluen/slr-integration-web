import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const { ObjectId } = Schema;

const ProjectAccess = new Schema({
  project: { type: ObjectId, ref: 'Project' },
  user: { type: ObjectId, ref: 'User' },
  permission: String,
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
});

module.exports = mongoose.model('ProjectAccess', ProjectAccess);
