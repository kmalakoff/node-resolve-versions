import type { VersionRaw } from 'node-semvers';

/**
 * The underlying per-version record returned with `path: 'raw'` — aliased from
 * node-semvers so the shape can never drift from the cache it comes from.
 */
export type VersionRecord = VersionRaw;

export type VersionCallback = (error?: Error | null, result?: string[] | VersionRecord[]) => void;

export interface VersionOptions {
  cwd?: string;
  path?: string;
  sort?: number;
  range?: string;
}

export type VersionDetails = string | number | VersionRecord;
