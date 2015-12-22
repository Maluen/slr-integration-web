import ProjectAccess from '../models/ProjectAccess';
import currentUserService from './currentUser';
import filter from 'lodash.filter';

export default function readProjects(filterObj, req) {
  return Promise.resolve().then(async () => {
    // TODO: validation

    let currentUser = null;
    try {
      const response = await currentUserService(req);
      currentUser = response.user;
      if (!currentUser) {
        throw new Error('Access denied: you must be logged-in.');
      }
    } catch (err) {
      throw err;
    }

    let projectAccessList = [];
    try {
      projectAccessList = await ProjectAccess.find({
        user: currentUser._id,
      }).populate('project');
    } catch (err) {
      throw new Error(err.err);
    }

    let projects = projectAccessList.map(projectAccess => projectAccess.project.toObject({ virtuals: true }));

    // filter
    if (typeof filterObj === 'object' && filterObj !== null) {
      projects = filter(projects, filterObj);
    }

    return { projects };
  });
}
