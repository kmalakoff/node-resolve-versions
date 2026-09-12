# node-resolve-versions

Convert a version expression to released Node.js versions (by full or partial semver, expression, or package.json engines.node).

```bash
npm install node-resolve-versions
```js

```
var assert = require('assert');
var resolveVersions = require('node-resolve-versions');

resolveVersions('12', function (err, versions) {
  assert.ok(!err, err ? err.message : '');
  assert.equal(versions.length, 1);
  assert.equal(versions[0].slice(0, 4), 'v12.');
});

resolveVersions('>=8', { range: 'major,even' }, function (err, versions) {
  assert.ok(!err, err ? err.message : '');
  assert.ok(versions.length > 1);
});

resolveVersions('12,14', function (err, versions) {
  assert.ok(!err, err ? err.message : '');
  assert.ok(versions.length > 1);
});

// Promise form
resolveVersions('engines').then(function (versions) {
  console.log(versions);
});
```

Use the `cwd` option with `engines` to read another package's `engines.node`. The resolver reads the Node.js release metadata through its cache, so expressions such as `12` and `>=8` can change as releases are published.
