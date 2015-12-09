import http from '../core/HttpClient';

export default {

  register: async (email, password) => {
    return await http.post('/api/register', { email, password });
  },

  login: async (email, password) => {
    return await http.post('/api/login', { email, password });
  },

  currentuser: async () => {
    return await http.get('/api/currentuser');
  },

  logout: async () => {
    return await http.get('/api/logout');
  },

  createMachine: async (hostname, port) => {
    return await http.post('/api/createMachine', { hostname, port });
  },

  createMachineAccess: async (machineId, userId, permission) => {
    return await http.post('/api/createMachineAccess', { machineId, userId, permission });
  },

};
