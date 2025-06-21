import NodeSemvers from 'node-semvers';
import resolveVersions from './resolveVersions.ts';

import type { VersionCallback, VersionDetails, VersionOptions, VersionResult } from './types.ts';

export default function worker(versionDetails: VersionDetails, options: VersionOptions, callback: VersionCallback): undefined {
  NodeSemvers.load((err, semvers) => {
    if (err) return callback(err);
    try {
      const version = resolveVersions(semvers, versionDetails, options);
      callback(null, version);
    } catch (err) {
      callback(err);
    }
  });
}

export function sync(versionDetails: VersionDetails, options: VersionOptions): VersionResult {
  const semvers = NodeSemvers.loadSync();
  return resolveVersions(semvers, versionDetails, options || {});
}
