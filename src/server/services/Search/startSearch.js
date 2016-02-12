import currentUserService from '../User/currentUser';
import ProjectAccess from '../../models/ProjectAccess';
import MachineAccess from '../../models/MachineAccess';
import Search from '../../models/Search';
import Project from '../../models/Project';
import Machine from '../../models/Machine';
import Globals from '../../../core/Globals';

export default function startSearch(projectId, id, machineId, resume, req) {
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

    if (typeof projectId === 'undefined') {
      throw new Error(`The 'machineId' query parameter cannot be empty.`);
    }

    if (typeof id === 'undefined') {
      throw new Error(`The 'id' query parameter cannot be empty.`);
    }

    if (typeof machineId === 'undefined') {
      throw new Error(`The 'machineId' query parameter cannot be empty.`);
    }

    if (typeof resume === 'undefined') {
      throw new Error(`The 'resume' query parameter cannot be empty.`);
    }

    try {
      const count = await ProjectAccess.count({
        project: projectId,
        user: currentUser._id,
        permission: 'Administrator',
      });
      if (count === 0) {
        throw new Error('Access denied: you must be an Administrator of the project to start its searches.');
      }
    } catch (err) {
      throw new Error(err.err);
    }

    try {
      const count = await MachineAccess.count({
        machine: machineId,
        user: currentUser._id,
        permission: 'Administrator',
      });
      if (count === 0) {
        throw new Error('Access denied: you must be an Administrator of the machine to use it.');
      }
    } catch (err) {
      throw new Error(err.err);
    }

    let search;
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

    let project;
    try {
      project = await Project.findOne({ _id: projectId });
    } catch (err) {
      throw new Error(err.err);
    }
    if (!project) {
      throw new Error('The project does not exists.');
    }

    let machine;
    try {
      machine = await Machine.findOne({ _id: machineId });
    } catch (err) {
      throw new Error(err.err);
    }
    if (!machine) {
      throw new Error('The machine does not exists.');
    }

    search = search.toObject({ virtuals: true });
    project = project.toObject({ virtuals: true });
    machine = machine.toObject({ virtuals: true });

    return Globals.webSocketServer.startSearch(project, search, machine, resume);
  });
}
