const jwt = require('jsonwebtoken');
const jwtconfig = require('../jwt-config');

module.exports = function(request, response, next) {
  const token = request.headers['auth-token'];

  if (!token) {
    // stop user auth validation
    response.status(401).send({ auth: false, msg: 'Access Denied' });
  }

  try {
    // return the user's id when creating the token
    const verified = jwt.verify(token, jwtconfig.secret); // { id: '1', iat: 'vn39u4g'}
    request.user = verified;
    next();
  } catch (error) {
    response.status(400).send({ msg: 'Invalid Token' });
  }
};