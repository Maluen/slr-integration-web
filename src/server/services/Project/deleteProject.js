import Project from '../../models/Project';
import ProjectAccess from '../../models/ProjectAccess';
import Search from '../../models/Search';
import { deleteSearch } from '../Search/deleteSearch';
import callService from '../../callService';

import authenticated from '../middlewares/authenticated';

export const deleteProject = {
  method: 'post',
  remote: true,
  parameters: {
    id: String,
  },
  handler: [authenticated, ({ id, req, currentUser }) => {
    return Promise.resolve().then(async () => {
      // TODO: validation

      if (!id) {
        throw new Error(`The 'id' query parameter cannot be empty.`);
      }

      const project = await Project.findById(id);

      if (!project) {
        throw new Error('The requested project does not exists.');
      }

      const projectAccessCount = await ProjectAccess.count({
        project: id,
        user: currentUser._id,
        permission: 'Administrator',
      });
      if (projectAccessCount === 0) {
        throw new Error('Access denied: you must be an Administrator of this project to delete it.');
      }

      // Remove all the project searches first

      const searchList = await Search.find({ project: id }).populate('state');
      const searchRemovePromises = [];
      searchList.forEach(search => {
        // by using the dedicate service, we make sure
        // to recursively delete any other linked model
        const promise = callService(deleteSearch, { id: search.id, req });
        searchRemovePromises.push(promise);
      });
      await Promise.all(searchRemovePromises);

      // Remove all the project accesses first

      const projectAccessList = await ProjectAccess.find({ project: id });
      const projectAccessRemovePromises = [];
      projectAccessList.forEach(projectAccess => {
        const promise = projectAccess.remove();
        projectAccessRemovePromises.push(promise);
      });
      await Promise.all(projectAccessRemovePromises);

      // Remove the project
      await project.remove();

      return { project: project.toObject({ virtuals: true }) };
    });
  }],
};
