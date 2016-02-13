import Project from '../../models/Project';
import ProjectAccess from '../../models/ProjectAccess';
import currentUserService from '../User/currentUser';
import Search from '../../models/Search';
import deleteSearchService from '../Search/deleteSearch';

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

    // Remove all the project searches first

    let searchList = [];
    try {
      searchList = await Search.find({ project: id });
    } catch (err) {
      throw new Error(err.err);
    }
    const searchRemovePromises = [];
    searchList.forEach(search => {
      // by using the dedicate service, we make sure
      // to recursively delete any other linked model
      const promise = deleteSearchService(search.id, req);
      searchRemovePromises.push(promise);
    });
    try {
      await Promise.all(searchRemovePromises);
    } catch (err) {
      throw new Error(err.message);
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
