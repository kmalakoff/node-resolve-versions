import type NodeSemvers from 'node-semvers';

import resolveExpression from './resolveExpression.ts';
import sortFunction from './sortFunction.ts';

import type { VersionDetails, VersionOptions, VersionRecord } from './types.ts';

/**
 * Filter adjacent duplicates from a sorted array - O(n)
 */
function filterDuplicates<T>(arr: T[]): T[] {
  return arr.filter((item, i) => {
    if (i === 0) return true;
    const prev = arr[i - 1];
    if (typeof item === 'string') return item !== prev;
    return (item as unknown as VersionRecord).version !== (prev as unknown as VersionRecord).version;
  });
}

export default function resolveVersions(semvers: NodeSemvers, versionDetails: VersionDetails, options: VersionOptions): string[] | VersionRecord[] {
  if (versionDetails === null || versionDetails === undefined) throw new Error('versionDetails missing');
  if (typeof versionDetails === 'number') versionDetails = `${versionDetails}`;
  if (typeof versionDetails === 'string') {
    const results: (string | VersionRecord)[] = [];
    const expressions = versionDetails.split(',');
    for (let index = 0; index < expressions.length; index++) {
      const versions = resolveExpression(expressions[index], semvers, options);
      Array.prototype.push.apply(results, versions);
    }
    return filterDuplicates(results.sort(sortFunction(options))) as string[] | VersionRecord[];
  }
  if (!versionDetails.version || !versionDetails.date) throw new Error(`Unrecognized version details object: ${JSON.stringify(versionDetails)}`);
  return options.path === 'raw' ? [versionDetails] : [versionDetails.version];
}
