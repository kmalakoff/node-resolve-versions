const semver = require('semver');

module.exports = function sortFn(options) {
  // unique and sorted
  const sort = typeof options.sort === 'undefined' ? 1 : options.sort;
  if (sort < 1) {
    return options.path === 'raw' ? (a, b) => (semver.gt(a.version, b.version) ? -1 : 1) : (a, b) => (semver.gt(a, b) ? -1 : 1);
  }
  return options.path === 'raw' ? (a, b) => (semver.gt(a.version, b.version) ? 1 : -1) : (a, b) => (semver.gt(a, b) ? 1 : -1);
};
