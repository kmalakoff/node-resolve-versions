"use strict";
var path = require('path');
var isArray = require('isarray');
module.exports = function resolveExpression(key, semvers, options) {
    key = key.trim();
    if (key === 'engines') {
        var fullPath = path.join(options.cwd || process.cwd(), 'package.json');
        var pkg = require(fullPath);
        if (typeof pkg.engines === 'undefined') throw new Error("Engines not found in ".concat(fullPath));
        if (typeof pkg.engines.node === 'undefined') throw new Error("Engines node not found in ".concat(fullPath));
        return resolveExpression(pkg.engines.node, semvers, options);
    }
    var version = semvers.resolve(key, options);
    if (!version || isArray(version) && !version.length) throw new Error("Unrecognized version ".concat(key));
    return isArray(version) ? version : [
        version
    ];
};
/* CJS INTEROP */ if (exports.__esModule && exports.default) { try { Object.defineProperty(exports.default, '__esModule', { value: true }); for (var key in exports) { exports.default[key] = exports[key]; } } catch (_) {}; module.exports = exports.default; }