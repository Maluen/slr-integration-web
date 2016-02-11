import registerService from './services/User/register';
import loginService from './services/User/login';
import currentUserService from './services/User/currentUser';
import logoutService from './services/User/logout';
import readUsersService from './services/User/readUsers';

import saveMachineService from './services/Machine/saveMachine';
import deleteMachineService from './services/Machine/deleteMachine';
import saveMachineAccessService from './services/Machine/saveMachineAccess';
import readMachinesService from './services/Machine/readMachines';
import readMachineAccessesService from './services/Machine/readMachineAccesses';
import deleteMachineAccessService from './services/Machine/deleteMachineAccess';
import readSearchMachinesService from './services/Machine/readSearchMachines';

import saveProjectService from './services/Project/saveProject';
import deleteProjectService from './services/Project/deleteProject';
import saveProjectAccessService from './services/Project/saveProjectAccess';
import readProjectsService from './services/Project/readProjects';
import readProjectAccessesService from './services/Project/readProjectAccesses';
import deleteProjectAccessService from './services/Project/deleteProjectAccess';

import saveSearchService from './services/Search/saveSearch';
import deleteSearchService from './services/Search/deleteSearch';
import readSearchesService from './services/Search/readSearches';
import startSearchService from './services/Search/startSearch';

function deferService(target, key, descriptor) {
  const fn = descriptor.value;

  if (typeof fn !== 'function') {
    throw new Error(`@deferService decorator can only be applied to methods not: ${typeof fn}`);
  }

  return {
    configurable: true,
    get() {
      if (this === target.prototype || this.hasOwnProperty(key)) {
        return fn;
      }

      const wrapper = (...args) => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            fn(...args).then(resolve, reject);
          }, 0);
        });
      };

      Object.defineProperty(this, key, {
        value: wrapper,
        configurable: true,
        writable: true,
      });
      return wrapper;
    },
  };
}

// Note: defined as singleton class to have access to method decorators
export default new class Services {

  async register(email, password, req, res) {
    return await registerService(email, password, req, res);
  }

  async login(email, password, req, res) {
    return await loginService(email, password, req, res);
  }

  async currentUser(req) {
    return await currentUserService(req);
  }

  async logout(req) {
    return await logoutService(req);
  }

  async readUsers(filterObj, req) {
    return await readUsersService(req);
  }

  async saveMachine(id, name, password, hostname, port, req) {
    return await saveMachineService(id, name, password, hostname, port, req);
  }

  async deleteMachine(id, req) {
    return await deleteMachineService(id, req);
  }

  async saveMachineAccess(machineId, userId, permission, req) {
    return await saveMachineAccessService(machineId, userId, permission, undefined, req);
  }

  async readMachines(filterObj, req) {
    return await readMachinesService(filterObj, req);
  }

  async readMachineAccesses(machineId, req) {
    return await readMachineAccessesService(machineId, req);
  }

  async deleteMachineAccess(id, req) {
    return await deleteMachineAccessService(id, req);
  }

  async readSearchMachines(searchId, req) {
    return await readSearchMachinesService(searchId, req);
  }

  async saveProject(id, name, settings, req) {
    return await saveProjectService(id, name, settings, req);
  }

  async deleteProject(id, req) {
    return await deleteProjectService(id, req);
  }

  async saveProjectAccess(projectId, userId, permission, req) {
    return await saveProjectAccessService(projectId, userId, permission, undefined, req);
  }

  async readProjects(filterObj, req) {
    return await readProjectsService(filterObj, req);
  }

  async readProjectAccesses(projectId, req) {
    return await readProjectAccessesService(projectId, req);
  }

  async deleteProjectAccess(id, req) {
    return await deleteProjectAccessService(id, req);
  }

  async saveSearch(projectId, id, name, settings, req) {
    return await saveSearchService(projectId, id, name, settings, req);
  }

  async deleteSearch(id, req) {
    return await deleteSearchService(id, req);
  }

  async readSearches(projectId, filterObj, req) {
    return await readSearchesService(projectId, filterObj, req);
  }

  async startSearch(projectId, id, machineId, req) {
    return await startSearchService(projectId, id, machineId, req);
  }

};
