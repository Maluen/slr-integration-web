import Search from '../../models/Search';
import ProjectAccess from '../../models/ProjectAccess';
import { readMachines } from './readMachines';
import callService from '../../callService';

import authenticated from '../middlewares/authenticated';

export const readSearchMachines = {
  method: 'get',
  remote: true,
  parameters: {
    searchId: String,
  },
  handler: [authenticated, ({ searchId, req, currentUser }) => {
    return Promise.resolve().then(async () => {
      // TODO: validation

      if (!searchId) {
        throw new Error(`The 'searchId' query parameter cannot be empty.`);
      }

      const search = await Search.findOne({ _id: searchId }).populate('state');
      if (!search) {
        throw new Error(`The search does not exists.`);
      }

      const projectAccessCount = await ProjectAccess.count({
        project: search.project,
        user: currentUser._id,
        permission: 'Administrator',
      });
      if (projectAccessCount === 0) {
        throw new Error('Access denied: you must be an Administrator of the search project to manage its searches.');
      }

      return callService(readMachines, { filterObj: null, req });
    });
  }],
};
