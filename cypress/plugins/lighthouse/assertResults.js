const path = require('path');

const {
  loadAndParseRcFile,
  resolveRcFilePath,
} = require('@lhci/utils/src/lighthouserc');

const { readResults } = require('./readResults');

const ops = {
  '>': (a, b) => a > b,
  '>=': (a, b) => a >= b,
  '<': (a, b) => a < b,
  '<=': (a, b) => a <= b,
};

const assertResults = (url, configPath) => {
  const { requiredSuccessfulRuns = 1 } = loadAndParseRcFile(
    configPath ? path.resolve(configPath) : resolveRcFilePath(),
  );
  const scores = readResults(url, configPath);
  const results =
    scores.values.every(parseFloat) &&
    parseFloat(scores.expected) &&
    ['>', '>=', '<', '<='].includes(scores.operator) &&
    scores.values.map((value) => ops[scores.operator](value, scores.expected));
  return (
    // results outcome are list of bools so we filter only the truthy values and take the length of what remains
    results.filter((r) => r).length >= requiredSuccessfulRuns ||
    // if the level is not error then we will always return true
    scores.level !== 'error'
  );
};

module.exports = {
  assertResults,
};
