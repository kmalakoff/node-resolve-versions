"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return nodeResolveVersions;
    }
});
var _nodesemvers = /*#__PURE__*/ _interop_require_default(require("node-semvers"));
var _resolveVersions = /*#__PURE__*/ _interop_require_default(require("./resolveVersions"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function nodeResolveVersions(versionDetails, options, callback) {
    if (typeof options === "function") {
        callback = options;
        options = {};
    }
    if (typeof callback === "function") {
        return _nodesemvers.default.load(function(err, semvers) {
            if (err) return callback(err);
            try {
                var version = (0, _resolveVersions.default)(semvers, versionDetails, options || {});
                callback(null, version);
            } catch (err) {
                callback(err);
            }
        });
    }
    return new Promise(function(resolve, reject) {
        nodeResolveVersions(versionDetails, options, function(err, result) {
            err ? reject(err) : resolve(result);
        });
    });
}
module.exports.sync = function nodeResolveVersionsSync(versionDetails, options) {
    var semvers = _nodesemvers.default.loadSync();
    return (0, _resolveVersions.default)(semvers, versionDetails, options || {});
};
/* CJS INTEROP */ if (exports.__esModule && exports.default) { Object.defineProperty(exports.default, '__esModule', { value: true }); for (var key in exports) exports.default[key] = exports[key]; module.exports = exports.default; }