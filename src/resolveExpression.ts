import path from 'path';
const isArray = Array.isArray || ((x) => Object.prototype.toString.call(x) === '[object Array]');

export default function resolveExpression(key, semvers, options) {
  key = key.trim();
  if (key === 'engines') {
    const fullPath = path.join(options.cwd || process.cwd(), 'package.json');
    const pkg = require(fullPath);
    if (typeof pkg.engines === 'undefined') throw new Error(`Engines not found in ${fullPath}`);
    if (typeof pkg.engines.node === 'undefined') throw new Error(`Engines node not found in ${fullPath}`);
    return resolveExpression(pkg.engines.node, semvers, options);
  }
  const version = semvers.resolve(key, options);
  if (!version || (isArray(version) && !version.length)) throw new Error(`Unrecognized version ${key}`);
  return isArray(version) ? version : [version];
}
