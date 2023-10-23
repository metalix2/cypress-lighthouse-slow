const { spawnSync } = require('child_process');

const { assertResults } = require('./assertResults');

// global var to set the cypress chrome debug port.
let chromePort;

const fetchBrowser = (launchOptions) => {
  const remoteDebugging = launchOptions.args.find((config) =>
    config.includes('--remote-debugging-port='),
  );
  // runs before test and sets the chromePort for later.
  if (remoteDebugging) {
    // eslint-disable-next-line prefer-destructuring
    chromePort = remoteDebugging.split('=')[1];
  }
  return chromePort;
};

const lighthouse = async ({ configPath = '', id: suite, url } = {}) => {
  // Runs the lighthouseCI collect function which will run the test against the given url(s).
  // Run collect command as a child process..
  spawnSync(
    'node_modules/.bin/lhci',
    [
      'collect',
      `--url=${url}${url.includes('?') ? '&' : '?'}suite=${suite}`,
      `--settings.port=${chromePort}`,
      `--only-categories=performance`,
      // eslint-disable-next-line prefer-template
      `${configPath && '--config=' + configPath}`,
    ],
    {
      execPath: 'node',
      stdio: [process.stdin, process.stdout, process.stderr],
    },
  );

  // Run assert command as a child process as it will exit on failure we don't want to exit the tests..
  // we manually parse the results for finer control.
  spawnSync(
    'node_modules/.bin/lhci',
    // eslint-disable-next-line prefer-template
    ['assert', `${configPath && '--config=' + configPath}`],
    {
      execPath: 'node',
      stdio: [process.stdin, process.stdout, process.stderr],
    },
  );

  if (
    assertResults(
      `${url}${url.includes('?') ? '&' : '?'}suite=${suite}`,
      configPath,
    )
  ) {
    // eslint-disable-next-line no-console
    console.log('Assert passed');
    return { isSuccessfulRun: true };
  }
  // eslint-disable-next-line no-console
  console.log('Assert failed');
  return { isSuccessfulRun: false };
};

module.exports = {
  fetchBrowser,
  lighthouse,
};
