import NodeSemvers from 'node-semvers';
import resolveVersions from './resolveVersions';

function worker(versionDetails, options, callback) {
  return NodeSemvers.load((err, semvers) => {
    if (err) return callback(err);
    try {
      const version = resolveVersions(semvers, versionDetails, options);
      callback(null, version);
    } catch (err) {
      callback(err);
    }
  });
}

export default function nodeResolveVersions(versionDetails, options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }
  options = options || {};

  if (typeof callback === 'function') return worker(versionDetails, options, callback);
  return new Promise((resolve, reject) => worker(versionDetails, options, (err, result) => (err ? reject(err) : resolve(result))));
}

module.exports.sync = function nodeResolveVersionsSync(versionDetails, options) {
  const semvers = NodeSemvers.loadSync();
  return resolveVersions(semvers, versionDetails, options || {});
};
