import User from '../models/User';

export default function readUsers(filterObj, req) {
  return Promise.resolve().then(async () => {

    // filter keys validation
    const allowedKeys = ['email'];
    for (const filterKey of Object.keys(filterObj)) {
      if (allowedKeys.indexOf(filterKey) === -1) {
        throw new Error(`Invalid filter key: ${filterKey}`);
      }
    }

    // filter values validation
    const validationRules = {
      'email': value => typeof value === 'string' && value !== '',
    };
    for (const filterKey of Object.keys(filterObj)) {
      const validate = validationRules[filterKey];
      const filterValue = filterObj[filterKey];
      if (!validate(filterValue)) {
        throw new Error(`Invalid ${filterKey} value: ${filterValue}`);
      }
    }

    let users;
    try {
      users = await User.find(filterObj);
    } catch (err) {
      throw new Error(err.err);
    }

    users = users.map((user) => user.toObject({ virtuals: true }));
    return { users };
  });
}
