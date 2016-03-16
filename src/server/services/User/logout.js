export const logout = {
  method: 'get',
  remote: true,
  parameters: {
  },
  handler: [({ req }) => {
    return Promise.resolve().then(async () => {
      req.logout();
    });
  }],
};
