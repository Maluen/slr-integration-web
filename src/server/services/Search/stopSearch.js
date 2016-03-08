import ProjectAccess from '../../models/ProjectAccess';
import MachineAccess from '../../models/MachineAccess';
import Search from '../../models/Search';
import Project from '../../models/Project';
import Machine from '../../models/Machine';
import Globals from '../../../core/Globals';

import authenticated from '../middlewares/authenticated';

export const stopSearch = {
  method: 'post',
  remote: true,
  parameters: {
    projectId: String,
    id: String,
    machineId: String,
  },
  handler: [authenticated, ({ projectId, id, machineId, req, currentUser }) => {
    return Promise.resolve().then(async () => {
      // TODO: validation

      if (!projectId) {
        throw new Error(`The 'machineId' query parameter cannot be empty.`);
      }

      if (!id) {
        throw new Error(`The 'id' query parameter cannot be empty.`);
      }

      if (!machineId) {
        throw new Error(`The 'machineId' query parameter cannot be empty.`);
      }

      const projectAccessCount = await ProjectAccess.count({
        project: projectId,
        user: currentUser._id,
        permission: 'Administrator',
      });
      if (projectAccessCount === 0) {
        throw new Error('Access denied: you must be an Administrator of the project to start its searches.');
      }

      const machineAccessCount = await MachineAccess.count({
        machine: machineId,
        user: currentUser._id,
        permission: 'Administrator',
      });
      if (machineAccessCount === 0) {
        throw new Error('Access denied: you must be an Administrator of the machine to use it.');
      }

      let search = await Search.findOne({ _id: id }).populate('state');
      if (!search) {
        throw new Error('The search does not exists.');
      }
      if (!search.project.equals(projectId)) {
        throw new Error('The search does not belong to the provided project.');
      }

      let project = await Project.findOne({ _id: projectId });
      if (!project) {
        throw new Error('The project does not exists.');
      }

      let machine = await Machine.findOne({ _id: machineId });
      if (!machine) {
        throw new Error('The machine does not exists.');
      }

      search = search.toObject({ virtuals: true });
      project = project.toObject({ virtuals: true });
      machine = machine.toObject({ virtuals: true });

      return Globals.webSocketServer.stopSearch(project, search, machine);
    });
  }],
};

/*
export default function stopSearch(projectId, id, machineId, req) {
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
      throw new Error(`The 'machineId' query parameter cannot be empty.`);
    }

    if (!id) {
      throw new Error(`The 'id' query parameter cannot be empty.`);
    }

    if (!machineId) {
      throw new Error(`The 'machineId' query parameter cannot be empty.`);
    }

    const projectAccessCount = await ProjectAccess.count({
      project: projectId,
      user: currentUser._id,
      permission: 'Administrator',
    });
    if (projectAccessCount === 0) {
      throw new Error('Access denied: you must be an Administrator of the project to start its searches.');
    }

    const machineAccessCount = await MachineAccess.count({
      machine: machineId,
      user: currentUser._id,
      permission: 'Administrator',
    });
    if (machineAccessCount === 0) {
      throw new Error('Access denied: you must be an Administrator of the machine to use it.');
    }

    let search = await Search.findOne({ _id: id }).populate('state');
    if (!search) {
      throw new Error('The search does not exists.');
    }
    if (!search.project.equals(projectId)) {
      throw new Error('The search does not belong to the provided project.');
    }

    let project = await Project.findOne({ _id: projectId });
    if (!project) {
      throw new Error('The project does not exists.');
    }

    let machine = await Machine.findOne({ _id: machineId });
    if (!machine) {
      throw new Error('The machine does not exists.');
    }

    search = search.toObject({ virtuals: true });
    project = project.toObject({ virtuals: true });
    machine = machine.toObject({ virtuals: true });

    return Globals.webSocketServer.stopSearch(project, search, machine);
  })
  .catch(err => {
    throw new Error(typeof err === 'object' ? (err.message || err.err) : err);
  });
}
*/