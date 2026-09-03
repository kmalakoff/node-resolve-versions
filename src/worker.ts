import NodeSemvers from 'node-semvers';
import resolveVersions from './resolveVersions.ts';

import type { VersionCallback, VersionDetails, VersionOptions, VersionRecord } from './types.ts';

export default function worker(versionDetails: VersionDetails, options: VersionOptions, callback: VersionCallback): void {
  NodeSemvers.load((err, semvers) => {
    if (err) return callback(err);
    if (!semvers) return callback(new Error('semvers not loaded'));
    try {
      const version = resolveVersions(semvers, versionDetails, options);
      callback(undefined, version);
    } catch (err) {
      callback(err instanceof Error ? err : new Error(String(err)));
    }
  });
}
export function sync(versionDetails: VersionDetails, options: VersionOptions): string[];
export function sync(versionDetails: VersionDetails, options: VersionOptions): VersionRecord[];

export function sync(versionDetails: VersionDetails, options: VersionOptions): string[] | VersionRecord[] {
  const semvers = NodeSemvers.loadSync();
  if (!semvers) throw new Error('semvers not loaded');
  return resolveVersions(semvers, versionDetails, options || {});
}
