import type NodeSemvers from 'node-semvers';

import resolveExpression from './resolveExpression.ts';
import sortFunction from './sortFunction.ts';

import type { VersionDetails, VersionOptions, VersionResultRaw } from './types.ts';

/**
 * Filter adjacent duplicates from a sorted array - O(n)
 */
function filterDuplicates<T>(arr: T[]): T[] {
  return arr.filter((item, i) => {
    if (i === 0) return true;
    const prev = arr[i - 1];
    if (typeof item === 'string') return item !== prev;
    return (item as unknown as VersionResultRaw).version !== (prev as unknown as VersionResultRaw).version;
  });
}

export default function resolveVersions(semvers: NodeSemvers, versionDetails: VersionDetails, options: VersionOptions): string[] | VersionResultRaw[] {
  if (versionDetails === null || versionDetails === undefined) throw new Error('versionDetails missing');
  if (typeof versionDetails === 'number') versionDetails = `${versionDetails}`;
  if (typeof versionDetails === 'string') {
    const results = [];
    const expressions = versionDetails.split(',');
    for (let index = 0; index < expressions.length; index++) {
      const versions = resolveExpression(expressions[index], semvers, options);
      Array.prototype.push.apply(results, versions);
    }
    return filterDuplicates(results.sort(sortFunction(options)));
  }
  if (!versionDetails.version || !versionDetails.files) throw new Error(`Unrecognized version details object: ${JSON.stringify(versionDetails)}`);
  return options.path === 'raw' ? [versionDetails] : [versionDetails.version];
}
