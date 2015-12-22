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

  saveProject: async (id, name) => {
    return await http.post('/api/saveProject', { id, name });
  },

  deleteProject: async (id) => {
    return await http.post('/api/deleteProject', { id });
  },

  saveProjectAccess: async (projectId, userId, permission) => {
    return await http.post('/api/saveProjectAccess', { projectId, userId, permission });
  },

  readProjects: async (filterObj) => {
    return await http.get('/api/readProjects', { filterObj: JSON.stringify(filterObj) });
  },

  readProjectAccesses: async (projectId) => {
    return await http.get('/api/readProjectAccesses', { projectId });
  },

  deleteProjectAccess: async (id) => {
    return await http.post('/api/deleteProjectAccess', { id });
  },

};
