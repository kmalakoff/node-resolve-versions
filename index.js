var resolveVersions = require('./lib/resolveVersions');

module.exports = function nodeResolveVersions(versionDetails, options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }

  if (typeof callback === 'function') return resolveVersions(versionDetails, options || {}, callback);
  return new Promise(function (resolve, reject) {
    nodeResolveVersions(versionDetails, options, function (err, result) {
      err ? reject(err) : resolve(result);
    });
  });
};
