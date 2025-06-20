import uniq from 'lodash.uniq';

import resolveExpression from './resolveExpression.ts';
import sortFunction from './sortFunction.ts';

export default function resolveVersions(semvers, versionDetails, options) {
  if (versionDetails === null || versionDetails === undefined) throw new Error('versionDetails missing');
  if (typeof versionDetails === 'number') versionDetails = `${versionDetails}`;
  if (typeof versionDetails === 'string') {
    const results = [];
    const expressions = versionDetails.split(',');
    for (let index = 0; index < expressions.length; index++) {
      const versions = resolveExpression(expressions[index], semvers, options);
      Array.prototype.push.apply(results, versions);
    }
    return uniq(results).sort(sortFunction(options));
  }
  if (!versionDetails.version || !versionDetails.files) throw new Error(`Unrecognized version details object: ${JSON.stringify(versionDetails)}`);
  return options.path === 'raw' ? [versionDetails] : [versionDetails.version];
}
