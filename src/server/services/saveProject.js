import Project from '../models/Project';
import ProjectAccess from '../models/ProjectAccess';
import currentUserService from './currentUser';
import saveProjectAccessService from './saveProjectAccess';

export default function saveProject(id = null, name, req) {
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

    if (!name || name === 'undefined') {
      throw new Error(`The 'name' query parameter cannot be empty.`);
    }

    let project;
    if (id) {
      // update

      try {
        project = await Project.findOne({ _id: id });
      } catch (err) {
        throw new Error(err.err);
      }

      if (!project) {
        throw new Error('The project does not exists.');
      }

      let projectAccess;
      try {
        projectAccess = await ProjectAccess.findOne({
          user: currentUser._id,
          project: id,
          permission: 'Administrator',
        });
      } catch (err) {
        throw new Error(err.err);
      }

      if (!projectAccess) {
        throw new Error('Access denied: you must be an Administrator of this project to edit it.');
      }

      project.name = name;
    } else {
      // create
      project = new Project({ name });
    }

    try {
      await project.save();
    } catch (err) {
      throw new Error(err.err);
    }

    if (!id) {
      // add access to project creator
      try {
        await saveProjectAccessService(project._id, currentUser._id, 'Administrator', { isAfterCreate: true }, req);
      } catch (err) {
        throw err;
      }
    }

    return { project: project.toObject({ virtuals: true }) };
  });
}
