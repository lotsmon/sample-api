var jwt = require('jsonwebtoken');
const secret = '$2b$04$1J43vObuWYz0SwrqCvgyUe';

module.exports.users = []

module.exports.authenticator = function (req, res, next) {
  if (!req.headers['authorization']) {
    res.status(401).send("Unauthorized")
  } else {
    jwt.verify(req.headers['authorization'], secret, (err, decoded) => {
      if (err) {
        res.status(403).send("Forbidden")
      } else {
        next()
      }
    })
  }
}