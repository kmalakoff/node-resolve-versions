var resolveVersions = require('./lib/resolveVersions');

module.exports = function nodeResolveVersions(versionExpression, options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }
  options = options || {};

  if (typeof callback === 'function') return resolveVersions(versionExpression, options, callback);
  return new Promise(function (resolve, reject) {
    nodeResolveVersions(versionExpression, options, function (err, result) {
      err ? reject(err) : resolve(result);
    });
  });
};
