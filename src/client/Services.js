import http from '../core/HttpClient';

export default {

  register: async (email, password) => {
    return await http.post('/api/register', { email, password });
  },

  login: async (email, password) => {
    return await http.post('/api/login', { email, password });
  },

  currentUser: async () => {
    return await http.get('/api/currentUser');
  },

  logout: async () => {
    return await http.get('/api/logout');
  },

  saveMachine: async (id, hostname, port) => {
    return await http.post('/api/saveMachine', { id, hostname, port });
  },

  saveMachineAccess: async (machineId, userId, permission) => {
    return await http.post('/api/saveMachineAccess', { machineId, userId, permission });
  },

  readMachines: async (filterObj) => {
    return await http.get('/api/readMachines', { filterObj: JSON.stringify(filterObj) });
  },

  readMachineAccesses: async (machineId) => {
    return await http.get('/api/readMachineAccesses', { machineId });
  },

};
