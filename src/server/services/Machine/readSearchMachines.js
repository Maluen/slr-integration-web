import currentUserService from '../User/currentUser';
import Search from '../../models/Search';
import ProjectAccess from '../../models/ProjectAccess';
import readMachinesService from './readMachines';

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

    if (typeof searchId === 'undefined') {
      throw new Error(`The 'searchId' query parameter cannot be undefined.`);
    }

    let search;
    try {
      search = await Search.findOne({ _id: searchId });
    } catch (err) {
      throw new Error(err.err);
    }

    if (!search) {
      throw new Error(`The search does not exists.`);
    }

    try {
      const count = await ProjectAccess.count({
        project: search.project,
        user: currentUser._id,
        permission: 'Administrator',
      });
      if (count === 0) {
        throw new Error('Access denied: you must be an Administrator of the search project to manage its searches.');
      }
    } catch (err) {
      throw new Error(err.err);
    }

    return readMachinesService(null, req);
  });
}
