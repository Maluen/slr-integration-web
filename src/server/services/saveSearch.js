import Search from '../models/Search';
import currentUserService from './currentUser';
import ProjectAccess from '../models/ProjectAccess';

export default function saveSearch(projectId, id = null, name, req) {
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

    if (!projectId || projectId === 'undefined') {
      throw new Error(`The 'name' query parameter cannot be empty.`);
    }

    if (!name || name === 'undefined') {
      throw new Error(`The 'name' query parameter cannot be empty.`);
    }

    try {
      const count = await ProjectAccess.count({
        project: projectId,
        user: currentUser._id,
        permission: 'Administrator',
      });
      if (count === 0) {
        throw new Error('Access denied: you must be an Administrator of the project to manage its searches.');
      }
    } catch (err) {
      throw new Error(err.err);
    }

    let search;
    if (id) {
      // update

      try {
        search = await Search.findOne({ _id: id });
      } catch (err) {
        throw new Error(err.err);
      }
      if (!search) {
        throw new Error('The search does not exists.');
      }
      if (!search.project.equals(projectId)) {
        throw new Error('The search does not belong to the provided project.');
      }

      search.name = name;
    } else {
      // create
      search = new Search({ project: projectId, name });
    }

    try {
      await search.save();
    } catch (err) {
      throw new Error(err.err);
    }

    return { search: search.toObject({ virtuals: true }) };
  });
}
