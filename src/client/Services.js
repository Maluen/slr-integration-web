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

  readUsers: async (filterObj) => {
    return await http.get('/api/readUsers', { filterObj: JSON.stringify(filterObj) });
  },

  saveMachine: async (id, hostname, port) => {
    return await http.post('/api/saveMachine', { id, hostname, port });
  },

  deleteMachine: async (id) => {
    return await http.post('/api/deleteMachine', { id });
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

  deleteMachineAccess: async (id) => {
    return await http.post('/api/deleteMachineAccess', { id });
  },

};
