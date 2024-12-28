const assert = require('assert');
const path = require('path');

const resolveVersions = require('node-resolve-versions');
const versionDetails_14_4_0 = require('../data/versionDetails_14_4_0');

describe('callback', () => {
  (() => {
    // patch and restore promise
    let rootPromise;
    before(() => {
      rootPromise = global.Promise;
      global.Promise = require('pinkie-promise');
    });
    after(() => {
      global.Promise = rootPromise;
    });
  })();

  describe('happy path', () => {
    it('v12', (done) => {
      resolveVersions('v12', (err, versions) => {
        assert.ok(!err, err ? err.message : '');
        assert.equal(versions.length, 1);
        assert.equal(versions[0].slice(0, 4), 'v12.');
        done();
      });
    });

    it('12', (done) => {
      resolveVersions('12', (err, versions) => {
        assert.ok(!err, err ? err.message : '');
        assert.equal(versions.length, 1);
        assert.equal(versions[0].slice(0, 4), 'v12.');
        done();
      });
    });

    it('12 number', (done) => {
      resolveVersions(12, (err, versions) => {
        assert.ok(!err, err ? err.message : '');
        assert.equal(versions.length, 1);
        assert.equal(versions[0].slice(0, 4), 'v12.');
        done();
      });
    });

    it('v0', (done) => {
      resolveVersions('v0', (err, versions) => {
        assert.ok(!err, err ? err.message : '');
        assert.equal(versions.length, 1);
        assert.equal(versions[0].slice(0, 3), 'v0.');
        done();
      });
    });

    it('0', (done) => {
      resolveVersions('0', (err, versions) => {
        assert.ok(!err, err ? err.message : '');
        assert.equal(versions.length, 1);
        assert.equal(versions[0].slice(0, 3), 'v0.');
        done();
      });
    });

    it('v12.0', (done) => {
      resolveVersions('v12.0', (err, versions) => {
        assert.ok(!err, err ? err.message : '');
        assert.equal(versions.length, 1);
        assert.equal(versions[0].slice(0, 6), 'v12.0.');
        done();
      });
    });

    it('12.0', (done) => {
      resolveVersions('12.0', (err, versions) => {
        assert.ok(!err, err ? err.message : '');
        assert.equal(versions.length, 1);
        assert.equal(versions[0].slice(0, 6), 'v12.0.');
        done();
      });
    });

    it('v12.1.0', (done) => {
      resolveVersions('v12.1.0', (err, versions) => {
        assert.ok(!err, err ? err.message : '');
        assert.equal(versions.length, 1);
        assert.equal(versions, 'v12.1.0');
        done();
      });
    });

    it('12.1.0', (done) => {
      resolveVersions('12.1.0', (err, versions) => {
        assert.ok(!err, err ? err.message : '');
        assert.equal(versions.length, 1);
        assert.equal(versions, 'v12.1.0');
        done();
      });
    });

    it('>=8', (done) => {
      resolveVersions('>=8', { range: 'major,even' }, (err, versions) => {
        assert.ok(!err, err ? err.message : '');
        assert.ok(versions.length > 1);
        done();
      });
    });

    it('12,14 (uniq, default sort, trim)', (done) => {
      resolveVersions('12.1.0,14.3.0, 12.1.0', (err, versions) => {
        assert.ok(!err, err ? err.message : '');
        assert.equal(versions.length, 2);
        assert.equal(versions[0], 'v12.1.0');
        assert.equal(versions[1], 'v14.3.0');
        done();
      });
    });

    it('12,14 (sort 1)', (done) => {
      resolveVersions('14.3.0,12.1.0', { sort: 1 }, (err, versions) => {
        assert.ok(!err, err ? err.message : '');
        assert.equal(versions.length, 2);
        assert.equal(versions[0], 'v12.1.0');
        assert.equal(versions[1], 'v14.3.0');
        done();
      });
    });

    it('12,14 (sort -1)', (done) => {
      resolveVersions('12.1.0,14.3.0', { sort: -1 }, (err, versions) => {
        assert.ok(!err, err ? err.message : '');
        assert.equal(versions.length, 2);
        assert.equal(versions[0], 'v14.3.0');
        assert.equal(versions[1], 'v12.1.0');
        done();
      });
    });

    it('12,14 (sort -1, path raw)', (done) => {
      resolveVersions('12.1.0,14.3.0', { sort: -1, path: 'raw' }, (err, versions) => {
        assert.ok(!err, err ? err.message : '');
        assert.equal(versions.length, 2);
        assert.ok(versions[0].files !== undefined);
        assert.equal(versions[0].version, 'v14.3.0');
        assert.ok(versions[1].files !== undefined);
        assert.equal(versions[1].version, 'v12.1.0');
        done();
      });
    });

    it('using engines (12, trim)', (done) => {
      const cwd = path.resolve(path.join(__dirname, '..', 'data', 'engines'));
      resolveVersions('engines ', { cwd }, (err, versions) => {
        assert.ok(!err, err ? err.message : '');
        assert.equal(versions.length, 1);
        assert.ok(versions[0].indexOf('v12.') === 0);
        done();
      });
    });

    it('using description from https://nodejs.org/dist/index.json', (done) => {
      resolveVersions(versionDetails_14_4_0, (err, versions) => {
        assert.ok(!err, err ? err.message : '');
        assert.equal(versions.length, 1);
        assert.equal(versions[0], 'v14.4.0');
        done();
      });
    });

    it('using description from https://nodejs.org/dist/index.json (path raw)', (done) => {
      resolveVersions(versionDetails_14_4_0, { path: 'raw' }, (err, versions) => {
        assert.ok(!err, err ? err.message : '');
        assert.equal(versions.length, 1);
        assert.ok(versions[0].files !== undefined);
        assert.equal(versions[0].version, 'v14.4.0');
        done();
      });
    });

    it('using description from https://nodejs.org/dist/index.json - promise', async () => {
      const versions = await resolveVersions(versionDetails_14_4_0);
      assert.equal(versions.length, 1);
      assert.equal(versions[0], 'v14.4.0');
    });

    it('12,14 (sort 1) - promise', async () => {
      const versions = await resolveVersions('14.3.0,12.1.0', { sort: 1 });
      assert.equal(versions.length, 2);
      assert.equal(versions[0], 'v12.1.0');
      assert.equal(versions[1], 'v14.3.0');
    });
  });

  describe('unhappy path', () => {
    it('v0.0', (done) => {
      resolveVersions('v0.0', (err) => {
        assert.ok(!!err);
        done();
      });
    });

    it('0.0', (done) => {
      resolveVersions('0.0', (err) => {
        assert.ok(!!err);
        done();
      });
    });

    it('v0.0.0', (done) => {
      resolveVersions('v0.0.0', (err, _versions) => {
        assert.ok(!!err);
        done();
      });
    });

    it('0.0.0', (done) => {
      resolveVersions('0.0.0', (err, _versions) => {
        assert.ok(!!err);
        done();
      });
    });

    it('va.0.1', (done) => {
      resolveVersions('va.0.1', (err) => {
        assert.ok(!!err);
        done();
      });
    });

    it('v12a.0.1', (done) => {
      resolveVersions('v12a.0.1', (err) => {
        assert.ok(!!err);
        done();
      });
    });

    it('v12.b.1', (done) => {
      resolveVersions('v12.b.1', (err) => {
        assert.ok(!!err);
        done();
      });
    });

    it('v12.0b.1', (done) => {
      resolveVersions('v12.0b.1', (err) => {
        assert.ok(!!err);
        done();
      });
    });

    it('v12.0.c', (done) => {
      resolveVersions('v12.0.c', (err) => {
        assert.ok(!!err);
        done();
      });
    });

    it('v12.1.0c', (done) => {
      resolveVersions('v12.1.0c', (err) => {
        assert.ok(!!err);
        done();
      });
    });

    it('engines missing', (done) => {
      const cwd = path.resolve(path.join(__dirname, '..', 'data', 'engines-missing'));
      resolveVersions('engines', { cwd }, (err, _versions) => {
        assert.ok(!!err);
        done();
      });
    });

    it('engines node missing', (done) => {
      const cwd = path.resolve(path.join(__dirname, '..', 'data', 'engines-node-missing'));
      resolveVersions('engines', { cwd }, (err, _versions) => {
        assert.ok(!!err);
        done();
      });
    });
  });
});
