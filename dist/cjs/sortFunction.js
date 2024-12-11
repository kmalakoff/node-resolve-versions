"use strict";
var semver = require('semver');
module.exports = function sortFn(options) {
    // unique and sorted
    var sort = typeof options.sort === 'undefined' ? 1 : options.sort;
    if (sort < 1) {
        return options.path === 'raw' ? function(a, b) {
            return semver.gt(a.version, b.version) ? -1 : 1;
        } : function(a, b) {
            return semver.gt(a, b) ? -1 : 1;
        };
    }
    return options.path === 'raw' ? function(a, b) {
        return semver.gt(a.version, b.version) ? 1 : -1;
    } : function(a, b) {
        return semver.gt(a, b) ? 1 : -1;
    };
};
/* CJS INTEROP */ if (exports.__esModule && exports.default) { try { Object.defineProperty(exports.default, '__esModule', { value: true }); for (var key in exports) { exports.default[key] = exports[key]; } } catch (_) {}; module.exports = exports.default; }