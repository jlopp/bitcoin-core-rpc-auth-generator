// Source: https://github.com/an-ivannikov-dev/bitcoin-rpcauth-js

const crypto = require('crypto');
const base64url = require('base64url');


// Create size byte hex salt
global.genSalt = function(size = 16) {
  const buffer = crypto.randomBytes(size);
  return buffer.toString('hex');
}

// Create 32 byte b64 password
global.genPass = function(size = 32) {
  const buffer = crypto.randomBytes(size);
  return base64url.fromBase64(buffer.toString('base64'));
}

global.genUser = function() {
  return 'user_' + Math.round(Math.random() * 1000);
}

global.genHash = function(password, salt) {
  const hash = crypto
    .createHmac('sha256', salt)
    .update(password)
    .digest('hex');
  return hash;
}

global.genRpcAuth = function(username = genUser(), password = genPass(), salt = genSalt()) {
  const hash = genHash(password, salt);
  return { username, password, salt, hash };
}

global.genRpcAuthStr = function(username, password, salt) {
  const rpcauth = genRpcAuth(username, password, salt);
  const str = `rpcauth=${rpcauth.username}:${rpcauth.salt}$${rpcauth.hash}`;
  return str;
}