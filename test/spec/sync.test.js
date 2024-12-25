const assert = require('assert');
const path = require('path');

const resolveVersions = require('node-resolve-versions');
const versionDetails_14_4_0 = require('../data/versionDetails_14_4_0');

describe('sync', () => {
  describe('happy path', () => {
    it('v12', () => {
      const versions = resolveVersions.sync('v12');
      assert.equal(versions.length, 1);
      assert.equal(versions[0].slice(0, 4), 'v12.');
    });

    it('12', () => {
      const versions = resolveVersions.sync('12');
      assert.equal(versions.length, 1);
      assert.equal(versions[0].slice(0, 4), 'v12.');
    });

    it('12 number', () => {
      const versions = resolveVersions.sync(12);
      assert.equal(versions.length, 1);
      assert.equal(versions[0].slice(0, 4), 'v12.');
    });

    it('v0', () => {
      const versions = resolveVersions.sync('v0');
      assert.equal(versions.length, 1);
      assert.equal(versions[0].slice(0, 3), 'v0.');
    });

    it('0', () => {
      const versions = resolveVersions.sync('0');
      assert.equal(versions.length, 1);
      assert.equal(versions[0].slice(0, 3), 'v0.');
    });

    it('v12.0', () => {
      const versions = resolveVersions.sync('v12.0');
      assert.equal(versions.length, 1);
      assert.equal(versions[0].slice(0, 6), 'v12.0.');
    });

    it('12.0', () => {
      const versions = resolveVersions.sync('12.0');
      assert.equal(versions.length, 1);
      assert.equal(versions[0].slice(0, 6), 'v12.0.');
    });

    it('v12.1.0', () => {
      const versions = resolveVersions.sync('v12.1.0');
      assert.equal(versions.length, 1);
      assert.equal(versions, 'v12.1.0');
    });

    it('12.1.0', () => {
      const versions = resolveVersions.sync('12.1.0');
      assert.equal(versions.length, 1);
      assert.equal(versions, 'v12.1.0');
    });

    it('>=8', () => {
      const versions = resolveVersions.sync('>=8', { range: 'major,even' });
      assert.ok(versions.length > 1);
    });

    it('12,14 (uniq, default sort, trim)', () => {
      const versions = resolveVersions.sync('12.1.0,14.3.0, 12.1.0');
      assert.equal(versions.length, 2);
      assert.equal(versions[0], 'v12.1.0');
      assert.equal(versions[1], 'v14.3.0');
    });

    it('12,14 (sort 1)', () => {
      const versions = resolveVersions.sync('14.3.0,12.1.0', { sort: 1 });
      assert.equal(versions.length, 2);
      assert.equal(versions[0], 'v12.1.0');
      assert.equal(versions[1], 'v14.3.0');
    });

    it('12,14 (sort -1)', () => {
      const versions = resolveVersions.sync('12.1.0,14.3.0', { sort: -1 });
      assert.equal(versions.length, 2);
      assert.equal(versions[0], 'v14.3.0');
      assert.equal(versions[1], 'v12.1.0');
    });

    it('12,14 (sort -1, path raw)', () => {
      const versions = resolveVersions.sync('12.1.0,14.3.0', { sort: -1, path: 'raw' });
      assert.equal(versions.length, 2);
      assert.ok(versions[0].files !== undefined);
      assert.equal(versions[0].version, 'v14.3.0');
      assert.ok(versions[1].files !== undefined);
      assert.equal(versions[1].version, 'v12.1.0');
    });

    it('using engines (12, trim)', () => {
      const cwd = path.resolve(path.join(__dirname, '..', 'data', 'engines'));
      const versions = resolveVersions.sync('engines ', { cwd });
      assert.equal(versions.length, 1);
      assert.ok(versions[0].indexOf('v12.') === 0);
    });

    it('using description from https://nodejs.org/dist/index.json', () => {
      const versions = resolveVersions.sync(versionDetails_14_4_0);
      assert.equal(versions.length, 1);
      assert.equal(versions[0], 'v14.4.0');
    });

    it('using description from https://nodejs.org/dist/index.json (path raw)', () => {
      const versions = resolveVersions.sync(versionDetails_14_4_0, { path: 'raw' });
      assert.equal(versions.length, 1);
      assert.ok(versions[0].files !== undefined);
      assert.equal(versions[0].version, 'v14.4.0');
    });
  });

  describe('unhappy path', () => {
    it('v0.0', () => {
      try {
        resolveVersions.sync('v0.0');
        assert.ok(false);
      } catch (err) {
        assert.ok(!!err);
      }
    });

    it('0.0', () => {
      try {
        resolveVersions.sync('0.0');
        assert.ok(false);
      } catch (err) {
        assert.ok(!!err);
      }
    });

    it('v0.0.0', () => {
      try {
        resolveVersions.sync('v0.0.0');
        assert.ok(false);
      } catch (err) {
        assert.ok(!!err);
      }
    });

    it('0.0.0', () => {
      try {
        resolveVersions.sync('0.0.0');
        assert.ok(false);
      } catch (err) {
        assert.ok(!!err);
      }
    });

    it('va.0.1', () => {
      try {
        resolveVersions.sync('va.0.1');
        assert.ok(false);
      } catch (err) {
        assert.ok(!!err);
      }
    });

    it('v12a.0.1', () => {
      try {
        resolveVersions.sync('v12a.0.1');
        assert.ok(false);
      } catch (err) {
        assert.ok(!!err);
      }
    });

    it('v12.b.1', () => {
      try {
        resolveVersions.sync('v12.b.1');
        assert.ok(false);
      } catch (err) {
        assert.ok(!!err);
      }
    });

    it('v12.0b.1', () => {
      try {
        resolveVersions.sync('v12.0b.1');
        assert.ok(false);
      } catch (err) {
        assert.ok(!!err);
      }
    });

    it('v12.0.c', () => {
      try {
        resolveVersions.sync('v12.0.c');
        assert.ok(false);
      } catch (err) {
        assert.ok(!!err);
      }
    });

    it('v12.1.0c', () => {
      try {
        resolveVersions.sync('v12.1.0c');
        assert.ok(false);
      } catch (err) {
        assert.ok(!!err);
      }
    });

    it('engines missing', () => {
      try {
        const cwd = path.resolve(path.join(__dirname, '..', 'data', 'engines-missing'));
        resolveVersions.sync('engines', { cwd });
        assert.ok(false);
      } catch (err) {
        assert.ok(!!err);
      }
    });

    it('engines node missing', () => {
      try {
        const cwd = path.resolve(path.join(__dirname, '..', 'data', 'engines-node-missing'));
        resolveVersions.sync('engines', { cwd });
        assert.ok(false);
      } catch (err) {
        assert.ok(!!err);
      }
    });
  });
});
