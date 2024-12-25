import NodeSemvers from 'node-semvers';
// biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
import Promise from 'pinkie-promise';
import resolveVersions from './resolveVersions';

export default function nodeResolveVersions(versionDetails, options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }

  if (typeof callback === 'function') {
    return NodeSemvers.load((err, semvers) => {
      if (err) return callback(err);
      try {
        const version = resolveVersions(semvers, versionDetails, options || {});
        callback(null, version);
      } catch (err) {
        callback(err);
      }
    });
  }
  return new Promise((resolve, reject) => {
    nodeResolveVersions(versionDetails, options, (err, result) => {
      err ? reject(err) : resolve(result);
    });
  });
}

module.exports.sync = function nodeResolveVersionsSync(versionDetails, options) {
  const semvers = NodeSemvers.loadSync();
  return resolveVersions(semvers, versionDetails, options || {});
};
