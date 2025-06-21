import type { VersionCallback, VersionDetails, VersionOptions, VersionResult } from './types.ts';
import worker, { sync as workerSync } from './worker.ts';

export * from './types.ts';

export default function nodeResolveVersions(versionDetails: VersionDetails): Promise<VersionResult[]>;
export default function nodeResolveVersions(versionDetails: VersionDetails, options: VersionOptions): Promise<VersionResult[]>;

export default function nodeResolveVersions(versionDetails: VersionDetails, callback: VersionCallback): undefined;
export default function nodeResolveVersions(versionDetails: VersionDetails, options: VersionOptions, callback: VersionCallback): undefined;

export default function nodeResolveVersions(versionDetails: VersionDetails, options?: VersionOptions | VersionCallback, callback?: VersionCallback): Promise<VersionResult[]> | undefined {
  if (typeof options === 'function') {
    callback = options as VersionCallback;
    options = {};
  }
  options = options || {};

  if (typeof callback === 'function') return worker(versionDetails, options, callback) as undefined;
  return new Promise((resolve, reject) =>
    worker(versionDetails, options, (err, result) => {
      err ? reject(err) : resolve(result);
    })
  );
}

export function sync(versionDetails: VersionDetails, options?: VersionOptions): VersionResult[] {
  return workerSync(versionDetails, options);
}
