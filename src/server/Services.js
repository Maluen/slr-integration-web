import registerService from './services/register';
import loginService from './services/login';
import currentUserService from './services/currentUser';
import logoutService from './services/logout';
import readUsersService from './services/readUsers';
import saveMachineService from './services/saveMachine';
import deleteMachineService from './services/deleteMachine';
import saveMachineAccessService from './services/saveMachineAccess';
import readMachinesService from './services/readMachines';
import readMachineAccessesService from './services/readMachineAccesses';
import deleteMachineAccessService from './services/deleteMachineAccess';
import saveProjectService from './services/saveProject';
import deleteProjectService from './services/deleteProject';
import saveProjectAccessService from './services/saveProjectAccess';
import readProjectsService from './services/readProjects';
import readProjectAccessesService from './services/readProjectAccesses';
import deleteProjectAccessService from './services/deleteProjectAccess';
import saveSearchService from './services/saveSearch';
import deleteSearchService from './services/deleteSearch';
import readSearchesService from './services/readSearches';

export default {

  register: async (email, password, req, res) => {
    return await registerService(email, password, req, res);
  },

  login: async (email, password, req, res) => {
    return await loginService(email, password, req, res);
  },

  currentUser: async (req) => {
    return await currentUserService(req);
  },

  logout: async (req) => {
    return await logoutService(req);
  },

  readUsers: async (filterObj, req) => {
    return await readUsersService(req);
  },

  saveMachine: async (id, name, hostname, port, req) => {
    return await saveMachineService(id, name, hostname, port, req);
  },

  deleteMachine: async (id, req) => {
    return await deleteMachineService(id, req);
  },

  saveMachineAccess: async (machineId, userId, permission, req) => {
    return await saveMachineAccessService(machineId, userId, permission, undefined, req);
  },

  readMachines: async (filterObj, req) => {
    return await readMachinesService(filterObj, req);
  },

  readMachineAccesses: async (machineId, req) => {
    return await readMachineAccessesService(machineId, req);
  },

  deleteMachineAccess: async (id, req) => {
    return await deleteMachineAccessService(id, req);
  },

  saveProject: async (id, name, req) => {
    return await saveProjectService(id, name, req);
  },

  deleteProject: async (id, req) => {
    return await deleteProjectService(id, req);
  },

  saveProjectAccess: async (projectId, userId, permission, req) => {
    return await saveProjectAccessService(projectId, userId, permission, undefined, req);
  },

  readProjects: async (filterObj, req) => {
    return await readProjectsService(filterObj, req);
  },

  readProjectAccesses: async (projectId, req) => {
    return await readProjectAccessesService(projectId, req);
  },

  deleteProjectAccess: async (id, req) => {
    return await deleteProjectAccessService(id, req);
  },

  saveSearch: async (projectId, id, name, req) => {
    return await saveSearchService(projectId, id, name, req);
  },

  deleteSearch: async (id, req) => {
    return await deleteSearchService(id, req);
  },

  readSearches: async (projectId, filterObj, req) => {
    return await readSearchesService(projectId, filterObj, req);
  },


};
