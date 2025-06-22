import fs from 'fs';
import type NodeSemvers from 'node-semvers';
import path from 'path';

const isArray = Array.isArray || ((x) => Object.prototype.toString.call(x) === '[object Array]');

import type { VersionOptions, VersionResultRaw } from './types.ts';

export default function resolveExpression(key: string, semvers: NodeSemvers, options: VersionOptions): string[] | VersionResultRaw[] {
  key = key.trim();
  if (key === 'engines') {
    const fullPath = path.join(options.cwd || process.cwd(), 'package.json');
    const pkg = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
    if (typeof pkg.engines === 'undefined') throw new Error(`Engines not found in ${fullPath}`);
    if (typeof pkg.engines.node === 'undefined') throw new Error(`Engines node not found in ${fullPath}`);
    return resolveExpression(pkg.engines.node, semvers, options);
  }
  const version = semvers.resolve(key, options);
  if (!version || (isArray(version) && !(version as string[]).length)) throw new Error(`Unrecognized version ${key}`);
  return (isArray(version) ? version : [version]) as string[];
}
