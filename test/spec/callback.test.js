var assert = require('assert');
var path = require('path');

var resolveVersions = require('../..');

describe('callback', function () {
  describe('happy path', function () {
    it('v12', function (done) {
      resolveVersions('v12', function (err, versions) {
        assert.ok(!err);
        assert.equal(versions.length, 1);
        assert.equal(versions[0].slice(0, 4), 'v12.');
        done();
      });
    });
    it('12', function (done) {
      resolveVersions('12', function (err, versions) {
        assert.ok(!err);
        assert.equal(versions.length, 1);
        assert.equal(versions[0].slice(0, 4), 'v12.');
        done();
      });
    });
    it('v0', function (done) {
      resolveVersions('v0', function (err, versions) {
        assert.ok(!err);
        assert.equal(versions.length, 1);
        assert.equal(versions[0].slice(0, 3), 'v0.');
        done();
      });
    });
    it('0', function (done) {
      resolveVersions('0', function (err, versions) {
        assert.ok(!err);
        assert.equal(versions.length, 1);
        assert.equal(versions[0].slice(0, 3), 'v0.');
        done();
      });
    });
    it('v12.0', function (done) {
      resolveVersions('v12.0', function (err, versions) {
        assert.ok(!err);
        assert.equal(versions.length, 1);
        assert.equal(versions[0].slice(0, 6), 'v12.0.');
        done();
      });
    });
    it('12.0', function (done) {
      resolveVersions('12.0', function (err, versions) {
        assert.ok(!err);
        assert.equal(versions.length, 1);
        assert.equal(versions[0].slice(0, 6), 'v12.0.');
        done();
      });
    });
    it('v12.1.0', function (done) {
      resolveVersions('v12.1.0', function (err, versions) {
        assert.ok(!err);
        assert.equal(versions.length, 1);
        assert.equal(versions, 'v12.1.0');
        done();
      });
    });
    it('12.1.0', function (done) {
      resolveVersions('12.1.0', function (err, versions) {
        assert.ok(!err);
        assert.equal(versions.length, 1);
        assert.equal(versions, 'v12.1.0');
        done();
      });
    });
    it('>=8', function (done) {
      resolveVersions('>=8', { range: 'major,even' }, function (err, versions) {
        assert.ok(!err);
        assert.ok(versions.length > 1);
        done();
      });
    });
    it('12,14 (uniq, default sort, trim)', function (done) {
      resolveVersions('12.1.0,14.3.0, 12.1.0', function (err, versions) {
        assert.ok(!err);
        assert.equal(versions.length, 2);
        assert.equal(versions[0], 'v12.1.0');
        assert.equal(versions[1], 'v14.3.0');
        done();
      });
    });
    it('12,14 (sort 1)', function (done) {
      resolveVersions('14.3.0,12.1.0', { sort: 1 }, function (err, versions) {
        assert.ok(!err);
        assert.equal(versions.length, 2);
        assert.equal(versions[0], 'v12.1.0');
        assert.equal(versions[1], 'v14.3.0');
        done();
      });
    });
    it('12,14 (sort -1)', function (done) {
      resolveVersions('12.1.0,14.3.0', { sort: -1 }, function (err, versions) {
        assert.ok(!err);
        assert.equal(versions.length, 2);
        assert.equal(versions[0], 'v14.3.0');
        assert.equal(versions[1], 'v12.1.0');
        done();
      });
    });
    it('using engines (12, trim)', function (done) {
      var cwd = path.resolve(path.join(__dirname, '..', 'data', 'engines'));
      resolveVersions('engines ', { cwd: cwd }, function (err, versions) {
        assert.ok(!err);
        assert.equal(versions.length, 1);
        assert.ok(versions[0].indexOf('v12.') === 0);
        done();
      });
    });
  });

  describe('unhappy path', function () {
    it('v0.0', function (done) {
      resolveVersions('v0.0', function (err) {
        assert.ok(!!err);
        done();
      });
    });
    it('0.0', function (done) {
      resolveVersions('0.0', function (err) {
        assert.ok(!!err);
        done();
      });
    });
    it('v0.0.0', function (done) {
      resolveVersions('v0.0.0', function (err, versions) {
        assert.ok(!!err);
        done();
      });
    });
    it('0.0.0', function (done) {
      resolveVersions('0.0.0', function (err, versions) {
        assert.ok(!!err);
        done();
      });
    });
    it('va.0.1', function (done) {
      resolveVersions('va.0.1', function (err) {
        assert.ok(!!err);
        done();
      });
    });
    it('v12a.0.1', function (done) {
      resolveVersions('v12a.0.1', function (err) {
        assert.ok(!!err);
        done();
      });
    });
    it('v12.b.1', function (done) {
      resolveVersions('v12.b.1', function (err) {
        assert.ok(!!err);
        done();
      });
    });
    it('v12.0b.1', function (done) {
      resolveVersions('v12.0b.1', function (err) {
        assert.ok(!!err);
        done();
      });
    });
    it('v12.0.c', function (done) {
      resolveVersions('v12.0.c', function (err) {
        assert.ok(!!err);
        done();
      });
    });
    it('v12.1.0c', function (done) {
      resolveVersions('v12.1.0c', function (err) {
        assert.ok(!!err);
        done();
      });
    });
    it('engines missing', function (done) {
      var cwd = path.resolve(path.join(__dirname, '..', 'data', 'engines-missing'));
      resolveVersions('engines', { cwd: cwd }, function (err, versions) {
        assert.ok(!!err);
        done();
      });
    });

    it('engines node missing', function (done) {
      var cwd = path.resolve(path.join(__dirname, '..', 'data', 'engines-node-missing'));
      resolveVersions('engines', { cwd: cwd }, function (err, versions) {
        assert.ok(!!err);
        done();
      });
    });
  });
});
