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

};
