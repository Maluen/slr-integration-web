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

/*
export default function currentUser(req) {
  return Promise.resolve().then(async () => {
    // req.user is provided by passport if user is logged-in
    return { user: req.user };
  })
  .catch(err => {
    throw new Error(typeof err === 'object' ? (err.message || err.err) : err);
  });
}
*/