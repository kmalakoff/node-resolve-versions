var NodeSemvers = require('node-semvers');
var Queue = require('queue-cb');
var uniq = require('lodash.uniq');

var resolveExpression = require('./resolveExpression');
var sortFunction = require('./sortFunction');

module.exports = function resolveVersions(versionDetails, options, callback) {
  if (versionDetails === null || versionDetails === undefined) return callback(new Error('versionDetails missing'));
  if (typeof versionDetails === 'number') versionDetails = '' + versionDetails;
  if (typeof versionDetails === 'string') {
    return NodeSemvers.load(function (err, semvers) {
      if (err) return callback(err);

      var queue = new Queue();
      var results = [];
      var expressions = versionDetails.split(',');
      for (var index = 0; index < expressions.length; index++) {
        (function (expression) {
          queue.defer(function (callback) {
            resolveExpression(expression, semvers, options, function (err, versions) {
              if (err) return callback(err);
              Array.prototype.push.apply(results, versions);
              callback();
            });
          });
        })(expressions[index]);
      }
      queue.await(function (err) {
        if (err) return callback(err);

        results = uniq(results).sort(sortFunction(options));
        callback(null, results);
      });
    });
  }

  // infer type
  if (!versionDetails.version || !versionDetails.files) return callback(new Error('Unrecognized version details object: ' + JSON.stringify(versionDetails)));
  callback(null, options.path === 'raw' ? [versionDetails] : [versionDetails.version]);
};
