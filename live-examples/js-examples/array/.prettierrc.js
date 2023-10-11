// We use `.prettierrc.js` instead of `.prettierrc.json`
// so we can extend this repository's default `prettier` configuration.
module.exports = {
  ...require('../../../.prettierrc.json'),
  printWidth: 100,
};
