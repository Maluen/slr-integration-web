import Search from '../../models/Search';
import currentUserService from '../User/currentUser';
import ProjectAccess from '../../models/ProjectAccess';
import searchSettings from '../../../constants/searchSettings';

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

    if (!projectId || projectId === 'undefined') {
      throw new Error(`The 'name' query parameter cannot be empty.`);
    }

    if (!name || name === 'undefined') {
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
      search.settings = cleanSettings;
    } else {
      // create
      search = new Search({ project: projectId, name, settings: cleanSettings });
    }

    try {
      await search.save();
    } catch (err) {
      throw new Error(err.err);
    }

    return { search: search.toObject({ virtuals: true }) };
  });
}
