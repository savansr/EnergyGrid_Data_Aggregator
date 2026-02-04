const crypto = require("crypto");

function generateSignature(url, token, timestamp) {
  return crypto
    .createHash("md5")
    .update(url + token + timestamp)
    .digest("hex");
}

module.exports = generateSignature;
