import Search from '../../models/Search';
import ProjectAccess from '../../models/ProjectAccess';
import searchSettings from '../../../constants/searchSettings';
import SearchState from '../../models/SearchState';

import authenticated from '../middlewares/authenticated';

export const saveSearch = {
  method: 'post',
  remote: true,
  parameters: {
    projectId: String,
    id: String,
    name: String,
    settings: Object,
  },
  handler: [authenticated, ({ projectId, id = null, name, settings, req, currentUser }) => {
    return Promise.resolve().then(async () => {
      // TODO: validation

      if (!projectId) {
        throw new Error(`The 'name' query parameter cannot be empty.`);
      }

      if (!name) {
        throw new Error(`The 'name' query parameter cannot be empty.`);
      }

      const validSettingNames = Object.keys(searchSettings);
      const cleanSettings = [];

      for (const setting of settings) {
        if (typeof setting !== 'object' || setting === null) {
          throw new Error(`Each setting must be an object.`);
        }

        const settingName = setting.name;
        if (typeof settingName !== 'string') {
          throw new Error(`Each setting must have a name as a String.`);
        }

        const settingValue = setting.value;
        if (typeof settingValue !== 'string') {
          throw new Error(`Each setting must have a value as a String.`);
        }

        if (validSettingNames.indexOf(settingName) === -1) {
          throw new Error(`'${settingName}' is not a valid setting name.`);
        }

        cleanSettings.push({ name: settingName, value: settingValue });
      }

      const projectAccessCount = await ProjectAccess.count({
        project: projectId,
        user: currentUser._id,
        permission: 'Administrator',
      });
      if (projectAccessCount === 0) {
        throw new Error('Access denied: you must be an Administrator of the project to manage its searches.');
      }

      let search;
      if (id) {
        // update

        search = await Search.findOne({ _id: id }).populate('state');
        if (!search) {
          throw new Error('The search does not exists.');
        }
        if (!search.project.equals(projectId)) {
          throw new Error('The search does not belong to the provided project.');
        }

        search.name = name;
        search.settings = cleanSettings;
      } else {
        // create search state first
        const searchState = new SearchState({ status: 'created' });
        await searchState.save();

        // create
        search = new Search({ project: projectId, name, settings: cleanSettings, state: searchState._id });
      }

      await search.save();

      return { search: search.toObject({ virtuals: true }) };
    });
  }],
};

/*
export default function saveSearch(projectId, id = null, name, settings, req) {
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
      throw new Error(`The 'name' query parameter cannot be empty.`);
    }

    if (!name) {
      throw new Error(`The 'name' query parameter cannot be empty.`);
    }

    const validSettingNames = Object.keys(searchSettings);
    const cleanSettings = [];

    for (const setting of settings) {
      if (typeof setting !== 'object' || setting === null) {
        throw new Error(`Each setting must be an object.`);
      }

      const settingName = setting.name;
      if (typeof settingName !== 'string') {
        throw new Error(`Each setting must have a name as a String.`);
      }

      const settingValue = setting.value;
      if (typeof settingValue !== 'string') {
        throw new Error(`Each setting must have a value as a String.`);
      }

      if (validSettingNames.indexOf(settingName) === -1) {
        throw new Error(`'${settingName}' is not a valid setting name.`);
      }

      cleanSettings.push({ name: settingName, value: settingValue });
    }

    const projectAccessCount = await ProjectAccess.count({
      project: projectId,
      user: currentUser._id,
      permission: 'Administrator',
    });
    if (projectAccessCount === 0) {
      throw new Error('Access denied: you must be an Administrator of the project to manage its searches.');
    }

    let search;
    if (id) {
      // update

      search = await Search.findOne({ _id: id }).populate('state');
      if (!search) {
        throw new Error('The search does not exists.');
      }
      if (!search.project.equals(projectId)) {
        throw new Error('The search does not belong to the provided project.');
      }

      search.name = name;
      search.settings = cleanSettings;
    } else {
      // create search state first
      const searchState = new SearchState({ status: 'created' });
      await searchState.save();

      // create
      search = new Search({ project: projectId, name, settings: cleanSettings, state: searchState._id });
    }

    await search.save();

    return { search: search.toObject({ virtuals: true }) };
  })
  .catch(err => {
    throw new Error(typeof err === 'object' ? (err.message || err.err) : err);
  });
}
*/
