const Backend = require ('./backend');
const backend = new Backend ();

module.exports = backend;

exports.createBackend = function (opts) {
  return new Backend (opts);
}

exports.gridfs = require ('./gridfs');
