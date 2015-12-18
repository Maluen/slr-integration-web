export default function currentUser(req) {
  return Promise.resolve().then(async () => {
    // req.user is provided by passport if user is logged-in
    return { user: req.user };
  });
}
