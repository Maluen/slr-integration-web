import Project from '../models/Project';
import ProjectAccess from '../models/ProjectAccess';
import currentUserService from './currentUser';

export default function deleteProject(id, req) {
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

    if (!id) {
      throw new Error(`The 'id' query parameter cannot be empty.`);
    }

    const project = await Project.findById(id);

    if (!project) {
      throw new Error('The requested project does not exists.');
    }

    try {
      const count = await ProjectAccess.count({
        project: id,
        user: currentUser._id,
        permission: 'Administrator',
      });
      if (count === 0) {
        throw new Error('Access denied: you must be an Administrator of this project to delete it.');
      }
    } catch (err) {
      throw new Error(err.err);
    }

    // Remove all the project accesses first

    let projectAccessList = [];
    try {
      projectAccessList = await ProjectAccess.find({ project: id });
    } catch (err) {
      throw new Error(err.err);
    }
    const projectAccessRemovePromises = [];
    projectAccessList.forEach(projectAccess => {
      const promise = projectAccess.remove();
      projectAccessRemovePromises.push(promise);
    });
    try {
      await Promise.all(projectAccessRemovePromises);
    } catch (err) {
      throw new Error(err.err);
    }

    // Remove the project

    try {
      await project.remove();
    } catch (err) {
      throw new Error(err.err);
    }

    return { project: project.toObject({ virtuals: true }) };
  });
}
