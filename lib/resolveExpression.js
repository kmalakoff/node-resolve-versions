var path = require('path');
var isArray = require('isarray');

module.exports = function resolveExpression(key, semvers, options, callback) {
  key = key.trim();
  if (key === 'engines') {
    try {
      var fullPath = path.join(options.cwd || process.cwd(), 'package.json');
      var pkg = require(fullPath);
      if (typeof pkg.engines === 'undefined') return callback(new Error('Engines not found in ' + fullPath));
      if (typeof pkg.engines.node === 'undefined') return callback(new Error('Engines node not found in ' + fullPath));
      resolveExpression(pkg.engines.node, semvers, options, callback);
    } catch (err) {
      return callback(err);
    }
  } else {
    var version = semvers.resolve(key, options);
    if (!version || (isArray(version) && !version.length)) callback(new Error('Unrecognized version ' + key));
    callback(null, isArray(version) ? version : [version]);
  }
};
