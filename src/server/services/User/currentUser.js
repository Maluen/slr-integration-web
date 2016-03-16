export const currentUser = {
  method: 'get',
  remote: true,
  parameters: {
  },
  handler: [({ req }) => {
    // req.user is provided by passport if user is logged-in
    return Promise.resolve({ user: req.user });
  }],
};
