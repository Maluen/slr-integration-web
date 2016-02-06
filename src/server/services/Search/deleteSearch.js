import Search from '../../models/Search';
import ProjectAccess from '../../models/ProjectAccess';
import currentUserService from '../User/currentUser';

export default function deleteSearch(id, req) {
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

    const search = await Search.findById(id);

    if (!search) {
      throw new Error('The requested search does not exists.');
    }

    try {
      const count = await ProjectAccess.count({
        project: search.project,
        user: currentUser._id,
        permission: 'Administrator',
      });
      if (count === 0) {
        throw new Error('Access denied: you must be an Administrator of the project to delete its searches.');
      }
    } catch (err) {
      throw new Error(err.err);
    }

    // Remove the search

    try {
      await search.remove();
    } catch (err) {
      throw new Error(err.err);
    }

    return { search: search.toObject({ virtuals: true }) };
  });
}
