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

/*
export default function logout(req) {
  return Promise.resolve().then(async () => {
    req.logout();
  })
  .catch(err => {
    throw new Error(typeof err === 'object' ? (err.message || err.err) : err);
  });
}
*/