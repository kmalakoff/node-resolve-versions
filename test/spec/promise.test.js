var assert = require('assert');
var path = require('path');

var resolveVersions = require('../..');

describe('promise', function () {
  if (typeof Promise === 'undefined') return; // no promise support

  describe('happy path', function () {
    it('v12', function (done) {
      resolveVersions('v12')
        .then(function (versions) {
          assert.equal(versions.length, 1);
          assert.equal(versions[0].slice(0, 4), 'v12.');
          done();
        })
        .catch(done);
    });
    it('12', function (done) {
      resolveVersions('12')
        .then(function (versions) {
          assert.equal(versions.length, 1);
          assert.equal(versions[0].slice(0, 4), 'v12.');
          done();
        })
        .catch(done);
    });
    it('v0', function (done) {
      resolveVersions('v0')
        .then(function (versions) {
          assert.equal(versions.length, 1);
          assert.equal(versions[0].slice(0, 3), 'v0.');
          done();
        })
        .catch(done);
    });
    it('0', function (done) {
      resolveVersions('0')
        .then(function (versions) {
          assert.equal(versions.length, 1);
          assert.equal(versions[0].slice(0, 3), 'v0.');
          done();
        })
        .catch(done);
    });
    it('v12.0', function (done) {
      resolveVersions('v12.0')
        .then(function (versions) {
          assert.equal(versions.length, 1);
          assert.equal(versions[0].slice(0, 6), 'v12.0.');
          done();
        })
        .catch(done);
    });
    it('12.0', function (done) {
      resolveVersions('12.0')
        .then(function (versions) {
          assert.equal(versions.length, 1);
          assert.equal(versions[0].slice(0, 6), 'v12.0.');
          done();
        })
        .catch(done);
    });
    it('v12.1.0', function (done) {
      resolveVersions('v12.1.0')
        .then(function (versions) {
          assert.equal(versions.length, 1);
          assert.equal(versions, 'v12.1.0');
          done();
        })
        .catch(done);
    });
    it('12.1.0', function (done) {
      resolveVersions('12.1.0')
        .then(function (versions) {
          assert.equal(versions.length, 1);
          assert.equal(versions, 'v12.1.0');
          done();
        })
        .catch(done);
    });
    it('>=8', function (done) {
      resolveVersions('>=8')
        .then(function (versions) {
          assert.ok(versions.length > 1);
          done();
        })
        .catch(done);
    });
    it('12,14 (uniq, default sort, trim)', function (done) {
      resolveVersions('12.1.0,14.3.0, 12.1.0')
        .then(function (versions) {
          assert.equal(versions.length, 2);
          assert.equal(versions[0], 'v12.1.0');
          assert.equal(versions[1], 'v14.3.0');
          done();
        })
        .catch(done);
    });
    it('12,14 (sort 1)', function (done) {
      resolveVersions('14.3.0,12.1.0', { sort: 1 })
        .then(function (versions) {
          assert.equal(versions.length, 2);
          assert.equal(versions[0], 'v12.1.0');
          assert.equal(versions[1], 'v14.3.0');
          done();
        })
        .catch(done);
    });
    it('12,14 (sort -1)', function (done) {
      resolveVersions('12.1.0,14.3.0', { sort: -1 })
        .then(function (versions) {
          assert.equal(versions.length, 2);
          assert.equal(versions[0], 'v14.3.0');
          assert.equal(versions[1], 'v12.1.0');
          done();
        })
        .catch(done);
    });
    it('using engines (12, trim)', function (done) {
      var cwd = path.resolve(path.join(__dirname, '..', 'data', 'engines'));
      resolveVersions('engines ', { cwd: cwd })
        .then(function (versions) {
          assert.equal(versions.length, 1);
          assert.ok(versions[0].indexOf('v12.') === 0);
          done();
        })
        .catch(done);
    });
  });

  describe('unhappy path', function () {
    it('v0.0', function (done) {
      resolveVersions('v0.0')
        .then(function () {
          assert.ok(false);
        })
        .catch(function (err) {
          assert.ok(!!err);
          done();
        });
    });
    it('0.0', function (done) {
      resolveVersions('0.0')
        .then(function () {
          assert.ok(false);
        })
        .catch(function (err) {
          assert.ok(!!err);
          done();
        });
    });
    it('v0.0.0', function (done) {
      resolveVersions('v0.0.0')
        .then(function () {
          assert.ok(false);
        })
        .catch(function (err) {
          assert.ok(!!err);
          done();
        });
    });
    it('0.0.0', function (done) {
      resolveVersions('0.0.0')
        .then(function () {
          assert.ok(false);
        })
        .catch(function (err) {
          assert.ok(!!err);
          done();
        });
    });
    it('va.0.1', function (done) {
      resolveVersions('va.0.1')
        .then(function () {
          assert.ok(false);
        })
        .catch(function (err) {
          assert.ok(!!err);
          done();
        });
    });
    it('v12a.0.1', function (done) {
      resolveVersions('v12a.0.1')
        .then(function () {
          assert.ok(false);
        })
        .catch(function (err) {
          assert.ok(!!err);
          done();
        });
    });
    it('v12.b.1', function (done) {
      resolveVersions('v12.b.1')
        .then(function () {
          assert.ok(false);
        })
        .catch(function (err) {
          assert.ok(!!err);
          done();
        });
    });
    it('v12.0b.1', function (done) {
      resolveVersions('v12.0b.1')
        .then(function () {
          assert.ok(false);
        })
        .catch(function (err) {
          assert.ok(!!err);
          done();
        });
    });
    it('v12.0.c', function (done) {
      resolveVersions('v12.0.c')
        .then(function () {
          assert.ok(false);
        })
        .catch(function (err) {
          assert.ok(!!err);
          done();
        });
    });
    it('v12.1.0c', function (done) {
      resolveVersions('v12.1.0c')
        .then(function () {
          assert.ok(false);
        })
        .catch(function (err) {
          assert.ok(!!err);
          done();
        });
    });
    it('engines missing', function (done) {
      var cwd = path.resolve(path.join(__dirname, '..', 'data', 'engines-missing'));
      resolveVersions('engines', { cwd: cwd })
        .then(function () {
          assert.ok(false);
        })
        .catch(function (err) {
          assert.ok(!!err);
          done();
        });
    });

    it('engines node missing', function (done) {
      var cwd = path.resolve(path.join(__dirname, '..', 'data', 'engines-node-missing'));
      resolveVersions('engines', { cwd: cwd })
        .then(function () {
          assert.ok(false);
        })
        .catch(function (err) {
          assert.ok(!!err);
          done();
        });
    });
  });
});
