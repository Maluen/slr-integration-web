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

/*
export default function readSearchMachines(searchId, req) {
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

    return readMachinesService(null, req);
  })
  .catch(err => {
    throw new Error(typeof err === 'object' ? (err.message || err.err) : err);
  });
}
*/