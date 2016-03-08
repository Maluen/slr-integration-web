export default ({ req }) => {
  return Promise.resolve().then(() => {
    const currentUser = req.user;

    if (!currentUser) {
      throw new Error('Access denied: you must be logged-in.');
    }

    return { currentUser };
  });
};
