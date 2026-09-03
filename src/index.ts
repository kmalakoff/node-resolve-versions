import type { VersionCallback, VersionDetails, VersionOptions, VersionRecord } from './types.ts';
import worker, { sync as workerSync } from './worker.ts';

export * from './types.ts';

export default function nodeResolveVersions(versionDetails: VersionDetails): Promise<string[]>;
export default function nodeResolveVersions(versionDetails: VersionDetails): Promise<VersionRecord[]>;
export default function nodeResolveVersions(versionDetails: VersionDetails, options: VersionOptions): Promise<string[]>;
export default function nodeResolveVersions(versionDetails: VersionDetails, options: VersionOptions): Promise<VersionRecord[]>;

export default function nodeResolveVersions(versionDetails: VersionDetails, callback: VersionCallback): void;
export default function nodeResolveVersions(versionDetails: VersionDetails, options: VersionOptions, callback: VersionCallback): void;

export default function nodeResolveVersions(versionDetails: VersionDetails, options?: VersionOptions | VersionCallback, callback?: VersionCallback): Promise<string[] | VersionRecord[]> | void {
  callback = typeof options === 'function' ? options : callback;
  options = typeof options === 'function' ? {} : ((options || {}) as VersionOptions);

  if (typeof callback === 'function') return worker(versionDetails, options, callback);
  return new Promise((resolve, reject) => worker(versionDetails, options, (err, result) => (err ? reject(err) : resolve(result as string[] | VersionRecord[]))));
}

export function sync(versionDetails: VersionDetails, options?: VersionOptions): string[] | VersionRecord[] {
  return workerSync(versionDetails, options || {});
}
