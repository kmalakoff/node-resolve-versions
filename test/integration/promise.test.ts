import assert from 'assert';
import resolveVersions, { type VersionRecord } from 'node-resolve-versions';
import Pinkie from 'pinkie-promise';
import versionDetails_14_4_0 from '../data/versionDetails_14_4_0.cjs';

describe('promise', () => {
  (() => {
    // patch and restore promise
    if (typeof global === 'undefined') return;
    const globalPromise = global.Promise;
    before(() => {
      global.Promise = Pinkie;
    });
    after(() => {
      global.Promise = globalPromise;
    });
  })();

  describe('happy path', () => {
    it('using description from https://nodejs.org/dist/index.json - promise', async () => {
      const versions = await resolveVersions(versionDetails_14_4_0 as unknown as VersionRecord);
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
});
