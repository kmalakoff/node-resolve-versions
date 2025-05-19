import NodeSemvers from 'node-semvers';
import resolveVersions from './resolveVersions.js';

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

import type { VersionCallback, VersionDetails, VersionOptions, VersionResult } from './types.js';
export * from './types.js';

export default function nodeResolveVersions(versionDetails: VersionDetails, options?: VersionOptions | VersionCallback, callback?: VersionCallback): Promise<VersionResult[]> | undefined {
  if (typeof options === 'function') {
    callback = options as VersionCallback;
    options = {};
  }
  options = options || {};

  if (typeof callback === 'function') return worker(versionDetails, options, callback) as undefined;
  return new Promise((resolve, reject) => worker(versionDetails, options, (err, result) => (err ? reject(err) : resolve(result))));
}

export function sync(versionDetails, options) {
  const semvers = NodeSemvers.loadSync();
  return resolveVersions(semvers, versionDetails, options || {});
}
