"use strict";
var uniq = require("lodash.uniq");
var resolveExpression = require("./resolveExpression");
var sortFunction = require("./sortFunction");
module.exports = function resolveVersions(semvers, versionDetails, options) {
    if (versionDetails === null || versionDetails === undefined) throw new Error("versionDetails missing");
    if (typeof versionDetails === "number") versionDetails = "".concat(versionDetails);
    if (typeof versionDetails === "string") {
        var results = [];
        var expressions = versionDetails.split(",");
        for(var index = 0; index < expressions.length; index++){
            var versions = resolveExpression(expressions[index], semvers, options);
            Array.prototype.push.apply(results, versions);
        }
        return uniq(results).sort(sortFunction(options));
    }
    if (!versionDetails.version || !versionDetails.files) throw new Error("Unrecognized version details object: ".concat(JSON.stringify(versionDetails)));
    return options.path === "raw" ? [
        versionDetails
    ] : [
        versionDetails.version
    ];
};
/* CJS INTEROP */ if (exports.__esModule && exports.default) { Object.defineProperty(exports.default, '__esModule', { value: true }); for (var key in exports) exports.default[key] = exports[key]; module.exports = exports.default; }