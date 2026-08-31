import assert from 'assert';
import nodeResolveVersions, { sync } from 'node-resolve-versions';

describe('exports .ts', () => {
  it('default', () => {
    assert.equal(typeof nodeResolveVersions, 'function');
  });
  it('sync', () => {
    assert.equal(typeof sync, 'function');
  });
});
