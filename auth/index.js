const jwt = require('jsonwebtoken');
const config = require('../config');
const error = require('../utils/error');

const secret = config.jwt.secret;

function sign(data) {
  return jwt.sign(data, secret);
}

function verify(token) {
  return jwt.verify(token, secret);
}
function getToken(auth) {
  if (!auth) {
    throw error('[auth] empty token', 404);
  }

  if (auth.indexOf('Bearer ') === -1) {
    throw error('[auth] invalid format', 402);
  }

  let token = auth.replace('Bearer ', '');
  return token;
}
function decodeHeader(req) {
  const authorization = req.headers.authorization || '';
  const token = getToken(authorization);
  const decoded = verify(token);

  req.user = decoded;
  return decoded;
}

const check = {
  own: (req, owner) => {
    const decoded = decodeHeader(req);
    console.log(decoded);

    if (decoded.id !== owner) {
      throw error('[auth] operation not allowed', 401);
    }
  },
  logged: (req) => {
    const decoded = decodeHeader(req);
    console.log(decoded);
  },
};
module.exports = {
  sign,
  check,
};
