import http from '../core/HttpClient';

export default new class Services {
  call(method, serviceName, serviceArguments = {}) {
    const httpArguments = { ...serviceArguments };
    delete httpArguments.req;
    delete httpArguments.res;

    if (method === 'get') {
      for (const argName of Object.keys(httpArguments)) {
        const argValue = httpArguments[argName];
        const isObject = (typeof argValue === 'object' && argValue !== null);

        httpArguments[argName] = isObject ? JSON.stringify(argValue) : argValue;
      }
    }

    return http[method]('/api/services/' + serviceName, httpArguments);
  }

  get(...args) {
    return this.call('get', ...args);
  }

  post(...args) {
    return this.call('post', ...args);
  }
};
