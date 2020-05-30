var NodeSemvers = require('node-semvers');
var Queue = require('queue-cb');
var uniq = require('lodash.uniq');
var semver = require('semver');

var resolveExpression = require('./resolveExpression');

function sortAscending(a, b) {
  return semver.gt(a, b) ? 1 : -1;
}

function sortDescending(a, b) {
  return semver.gt(a, b) ? -1 : 1;
}

module.exports = function resolveVersions(versionExpression, options, callback) {
  NodeSemvers.load(function (err, semvers) {
    if (err) return callback(err);

    var queue = new Queue();

    var results = [];
    var expressions = versionExpression.split(',');
    for (var index = 0; index < expressions.length; index++) {
      queue.defer(function (callback) {
        resolveExpression(expressions[index], semvers, options, function (err, versions) {
          if (err) return callback(err);
          Array.prototype.push.apply(results, versions);
          callback();
        });
      });
    }
    queue.await(function (err) {
      if (err) return callback(err);

      // unique and sorted
      var sort = typeof options.sort === 'undefined' ? 1 : options.sort;
      results = uniq(results).sort(sort < 1 ? sortDescending : sortAscending);
      callback(null, results);
    });
  });
};
