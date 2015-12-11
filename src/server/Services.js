import registerService from './services/register';
import loginService from './services/login';
import currentuserService from './services/currentuser';
import logoutService from './services/logout';
import createMachineService from './services/createMachine';
import createMachineAccessService from './services/createMachineAccess';
import readMachinesService from './services/readMachines';

export default {

  register: async (email, password, req, res) => {
    return await registerService(email, password, req, res);
  },

  login: async (email, password, req, res) => {
    return await loginService(email, password, req, res);
  },

  currentuser: async (req) => {
    return await currentuserService(req);
  },

  logout: async (req) => {
    return await logoutService(req);
  },

  createMachine: async (hostname, port, req) => {
    return await createMachineService(hostname, port, req);
  },

  createMachineAccess: async (machineId, userId, permission, options, req) => {
    return await createMachineAccessService(machineId, userId, permission, options, req);
  },

  readMachines: async (req) => {
    return await readMachinesService(req);
  },

};
