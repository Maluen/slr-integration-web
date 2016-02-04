import Project from '../models/Project';
import ProjectAccess from '../models/ProjectAccess';
import currentUserService from './currentUser';
import saveProjectAccessService from './saveProjectAccess';
import projectSettings from '../../constants/projectSettings';

export default function saveProject(id = null, name, settings, req) {
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

    if (!name || name === 'undefined') {
      throw new Error(`The 'name' query parameter cannot be empty.`);
    }

    if (Array.isArray(settings) === false) {
      throw new Error(`The 'settings' query parameter must be an Array.`);
    }

    const validSettingNames = Object.keys(projectSettings);
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

      if (settingValue === '') {
        throw new Error(`The '${settingName}' setting cannot be empty.`);
      }

      cleanSettings.push({ name: settingName, value: settingValue });
    }

    let project;
    if (id) {
      // update

      try {
        project = await Project.findOne({ _id: id });
      } catch (err) {
        throw new Error(err.err);
      }

      if (!project) {
        throw new Error('The project does not exists.');
      }

      let projectAccess;
      try {
        projectAccess = await ProjectAccess.findOne({
          user: currentUser._id,
          project: id,
          permission: 'Administrator',
        });
      } catch (err) {
        throw new Error(err.err);
      }

      if (!projectAccess) {
        throw new Error('Access denied: you must be an Administrator of this project to edit it.');
      }

      project.name = name;
      project.settings = cleanSettings;
    } else {
      // create
      project = new Project({ name, settings: cleanSettings });
    }

    try {
      await project.save();
    } catch (err) {
      throw new Error(err.err);
    }

    if (!id) {
      // add access to project creator
      try {
        await saveProjectAccessService(project._id, currentUser._id, 'Administrator', { isAfterCreate: true }, req);
      } catch (err) {
        throw err;
      }
    }

    return { project: project.toObject({ virtuals: true }) };
  });
}
