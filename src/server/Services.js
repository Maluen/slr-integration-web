import registerService from './services/register';
import loginService from './services/login';
import currentuserService from './services/currentuser';
import logoutService from './services/logout';
import createMachineService from './services/createMachine';

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

};
