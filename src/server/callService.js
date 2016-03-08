export default (service, serviceArguments = {}) => {
  return Promise.resolve().then(async () => {
    // TODO: arguments type validation against service parameters

    const tasks = (typeof service.handler === 'function') ? [service.handler] : service.handler;
    let currentArguments = { ...serviceArguments };
    let newArguments = {};
    for (const task of tasks) {
      newArguments = await task(currentArguments);
      currentArguments = {
        ...currentArguments,
        ...newArguments,
      };
    }
    // return result of the last task
    return newArguments;
  })
  .catch(err => {
    throw new Error(typeof err === 'object' ? (err.message || err.err) : err);
  });
};
