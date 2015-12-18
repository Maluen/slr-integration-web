export default function logout(req) {
  return Promise.resolve().then(async () => {
    req.logout();
  });
}
