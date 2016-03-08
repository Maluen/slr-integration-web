import * as services from '../services/index';
import callService from '../callService';

import { Router } from 'express';

const router = new Router();

function createServiceRouter(serviceName, service) {
  if (!service.remote) return null;

  const serviceRouter = new Router();

  serviceRouter[service.method]('/services/' + serviceName, async (req, res) => {
    try {
      const httpArguments = ((service.method === 'get') ? req.query : req.body) || {};

      const serviceArguments = { ...httpArguments };
      if (service.method === 'get') {
        for (const argName of Object.keys(serviceArguments)) {
          const argValue = serviceArguments[argName];
          const argType = service.parameters[argName];
          const needsParse = ((argType === Object || argType === Array) && argValue);

          serviceArguments[argName] = needsParse ? JSON.parse(argValue) : argValue;
        }
      }

      const response = await callService(service, { ...serviceArguments, req, res });
      res.status(200).send(response);
    } catch (err) {
      res.status(400).send({ error: err.message });
    }
  });

  return serviceRouter;
}

for (const serviceName of Object.keys(services)) {
  const service = services[serviceName];
  const serviceRouter = createServiceRouter(serviceName, service);
  if (serviceRouter) {
    router.use(serviceRouter);
  }
}

export default router;
