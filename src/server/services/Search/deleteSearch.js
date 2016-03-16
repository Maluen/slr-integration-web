import Search from '../../models/Search';
import ProjectAccess from '../../models/ProjectAccess';
import SearchState from '../../models/SearchState';

import authenticated from '../middlewares/authenticated';

export const deleteSearch = {
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

      const search = await Search.findById(id).populate('state');

      if (!search) {
        throw new Error('The requested search does not exists.');
      }

      const projectAccessCount = await ProjectAccess.count({
        project: search.project,
        user: currentUser._id,
        permission: 'Administrator',
      });
      if (projectAccessCount === 0) {
        throw new Error('Access denied: you must be an Administrator of the project to delete its searches.');
      }

      // Remove the search state first
      const searchState = await SearchState.findById(search.state);
      if (searchState) {
        await searchState.remove();
      }

      // Remove the search
      await search.remove();

      return { search: search.toObject({ virtuals: true }) };
    });
  }],
};
