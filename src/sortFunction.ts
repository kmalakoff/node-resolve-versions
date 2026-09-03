import semver from 'semver';

import type { VersionOptions, VersionRecord } from './types.ts';

const asc = (a: string, b: string) => (semver.gt(a, b) ? 1 : -1);
const ascRaw = (a: VersionRecord, b: VersionRecord) => (semver.gt(a.version, b.version) ? 1 : -1);
const dsc = (a: string, b: string) => (semver.gt(a, b) ? -1 : 1);
const dscRaw = (a: VersionRecord, b: VersionRecord) => (semver.gt(a.version, b.version) ? -1 : 1);

type compareFn = (a: unknown, b: unknown) => number;

export default function sortFn(options: VersionOptions): compareFn {
  // unique and sorted
  const sort = typeof options.sort === 'undefined' ? 1 : options.sort;
  if (sort < 1) return options.path === 'raw' ? (dscRaw as compareFn) : (dsc as compareFn);
  return options.path === 'raw' ? (ascRaw as compareFn) : (asc as compareFn);
}
