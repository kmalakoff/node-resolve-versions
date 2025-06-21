import semver from 'semver';

import type { VersionOptions, VersionResultRaw } from './types.ts';

const asc = (a: string, b: string) => (semver.gt(a, b) ? 1 : -1);
const ascRaw = (a: VersionResultRaw, b: VersionResultRaw) => (semver.gt(a.version, b.version) ? 1 : -1);
const dsc = (a: string, b: string) => (semver.gt(a, b) ? -1 : 1);
const dscRaw = (a: VersionResultRaw, b: VersionResultRaw) => (semver.gt(a.version, b.version) ? -1 : 1);

type compareFn<T> = (a: T, b: T) => number;

export default function sortFn(options: VersionOptions): compareFn<unknown> {
  // unique and sorted
  const sort = typeof options.sort === 'undefined' ? 1 : options.sort;
  if (sort < 1) return options.path === 'raw' ? dscRaw : dsc;
  return options.path === 'raw' ? ascRaw : asc;
}
