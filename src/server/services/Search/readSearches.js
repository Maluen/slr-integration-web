import Search from '../../models/Search';
import ProjectAccess from '../../models/ProjectAccess';
import currentUserService from '../User/currentUser';
import filter from 'lodash.filter';

export default function readSearches(projectId, filterObj, req) {
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

    if (!projectId) {
      throw new Error(`The 'projectId' query parameter cannot be empty.`);
    }

    try {
      const count = await ProjectAccess.count({
        project: projectId,
        user: currentUser._id,
      });
      if (count === 0) {
        throw new Error('Access denied: you must have access to the project to view its searches.');
      }
    } catch (err) {
      throw new Error(err.err);
    }

    let searchList = [];
    try {
      searchList = await Search.find({
        project: projectId,
      }).populate('state');
    } catch (err) {
      throw new Error(err.err);
    }

    let searches = searchList.map(search => search.toObject({ virtuals: true }));

    // filter
    if (typeof filterObj === 'object' && filterObj !== null) {
      searches = filter(searches, filterObj);
    }

    return { searches };
  });
}
