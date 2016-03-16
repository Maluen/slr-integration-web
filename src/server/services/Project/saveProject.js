import Project from '../../models/Project';
import ProjectAccess from '../../models/ProjectAccess';
import { saveProjectAccess } from './saveProjectAccess';
import callService from '../../callService';
import projectSettings from '../../../constants/projectSettings';

import authenticated from '../middlewares/authenticated';

export const saveProject = {
  method: 'post',
  remote: true,
  parameters: {
    id: String,
    name: String,
    settings: Object,
  },
  handler: [authenticated, ({ id = null, name, settings, req, currentUser }) => {
    return Promise.resolve().then(async () => {
      // TODO: validation

      if (!name) {
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

        cleanSettings.push({ name: settingName, value: settingValue });
      }

      let project;
      if (id) {
        // update

        project = await Project.findOne({ _id: id });
        if (!project) {
          throw new Error('The project does not exists.');
        }

        const projectAccess = await ProjectAccess.findOne({
          user: currentUser._id,
          project: id,
          permission: 'Administrator',
        });
        if (!projectAccess) {
          throw new Error('Access denied: you must be an Administrator of this project to edit it.');
        }

        project.name = name;
        project.settings = cleanSettings;
      } else {
        // create
        project = new Project({ name, settings: cleanSettings });
      }

      await project.save();

      if (!id) {
        // add access to project creator
        await callService(saveProjectAccess, {
          projectId: project._id,
          userId: currentUser._id,
          permission: 'Administrator',
          options: { isAfterCreate: true },
          req,
        });
      }

      return { project: project.toObject({ virtuals: true }) };
    });
  }],
};
