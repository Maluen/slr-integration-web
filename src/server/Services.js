import registerService from './services/register';
import loginService from './services/login';
import currentUserService from './services/currentUser';
import logoutService from './services/logout';
import saveMachineService from './services/saveMachine';
import saveMachineAccessService from './services/saveMachineAccess';
import readMachinesService from './services/readMachines';
import readMachineAccessesService from './services/readMachineAccesses';
import deleteMachineAccessService from './services/deleteMachineAccess';

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

  saveMachine: async (id, hostname, port, req) => {
    return await saveMachineService(id, hostname, port, req);
  },

  saveMachineAccess: async (machineId, userId, permission, options, req) => {
    return await saveMachineAccessService(machineId, userId, permission, options, req);
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

};
