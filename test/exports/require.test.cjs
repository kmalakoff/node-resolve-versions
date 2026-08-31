const assert = require('assert');
const nodeResolveVersions = require('node-resolve-versions');

describe('exports .cjs', () => {
  it('default', () => {
    assert.equal(typeof nodeResolveVersions, 'function');
  });
  it('sync', () => {
    assert.equal(typeof nodeResolveVersions.sync, 'function');
  });
});
