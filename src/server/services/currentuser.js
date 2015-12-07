export default function currentuser(req) {
  return new Promise((resolve, reject) => {
    // req.user is provided by passport if user is logged-in
    if (req.user) {
      resolve({ user: req.user });
    } else {
      reject();
    }
  });
}
