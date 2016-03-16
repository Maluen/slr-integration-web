import Search from '../../models/Search';
import ProjectAccess from '../../models/ProjectAccess';
import Project from '../../models/Project';
import filter from 'lodash.filter';

import authenticated from '../middlewares/authenticated';

export const readSearches = {
  method: 'get',
  remote: true,
  parameters: {
    projectId: String,
    filterObj: Object,
  },
  handler: [authenticated, ({ projectId, filterObj, req, currentUser }) => {
    return Promise.resolve().then(async () => {
      // TODO: validation

      if (!projectId) {
        throw new Error(`The 'projectId' query parameter cannot be empty.`);
      }

      const projectAccessCount = await ProjectAccess.count({
        project: projectId,
        user: currentUser._id,
      });
      if (projectAccessCount === 0) {
        throw new Error('Access denied: you must have access to the project to view its searches.');
      }

      const project = await Project.findById(projectId);
      if (!project) {
        throw new Error('Project not found.');
      }

      const searchList = await Search.find({
        project: projectId,
      }).populate('state');

      let searches = searchList.map(search => search.toObject({ virtuals: true }));

      // filter
      if (typeof filterObj === 'object' && filterObj !== null) {
        searches = filter(searches, filterObj);
      }

      return { searches, project: project.toObject({ virtuals: true }) };
    });
  }],
};
