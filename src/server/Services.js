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

import * as services from './services/index';
import callService from './callService';

export default new class Services {
  call(method, serviceName, serviceArguments = {}) {
    const service = services[serviceName];
    if (service.method !== method) {
      return Promise.reject(new Error(
        `${serviceName}: service method does not match, expected ${service.method}, got ${method}`
      ));
    }

    return callService(service, serviceArguments);
  }

  get(...args) {
    return this.call('get', ...args);
  }

  post(...args) {
    return this.call('post', ...args);
  }
};
