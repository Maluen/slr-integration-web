import ProjectAccess from '../../models/ProjectAccess';
import filter from 'lodash.filter';

import authenticated from '../middlewares/authenticated';

export const readProjects = {
  method: 'get',
  remote: true,
  parameters: {
    filterObj: Object,
  },
  handler: [authenticated, ({ filterObj, req, currentUser }) => {
    return Promise.resolve().then(async () => {
      // TODO: validation

      const projectAccessList = await ProjectAccess.find({
        user: currentUser._id,
      }).populate('project');

      let projects = projectAccessList.map(projectAccess => projectAccess.project.toObject({ virtuals: true }));

      // filter
      if (typeof filterObj === 'object' && filterObj !== null) {
        projects = filter(projects, filterObj);
      }

      return { projects };
    });
  }],
};
