const { readFileSync } = require('fs');
const path = require('path');

const { resolveRcFilePath } = require('@lhci/utils/src/lighthouserc');

const readResults = (url, configPath) => {
  const assertionResults = path.join(
    path.dirname(configPath ? path.resolve(configPath) : resolveRcFilePath()),
    '.lighthouseci/assertion-results.json',
  );
  const allResults = JSON.parse(readFileSync(assertionResults, 'utf-8'));
  const scores = allResults.filter(
    (result) => result.auditId === 'categories' && result.url === url,
  )[0];
  return scores;
};

module.exports = {
  readResults,
};
