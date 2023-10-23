import { basename } from 'path';

import { isString, isEmpty } from 'lodash';

const VALID_BROWSERS = {
  Chrome: true,
  Chromium: true,
};

Cypress.Commands.add('lighthouse', (taskOptions = {}) => {
  const { displayName } = Cypress.browser;

  if (!VALID_BROWSERS[displayName]) {
    return cy.log(
      'cy.lighthouse()',
      `${displayName} is not supported. Skipping...`,
    );
  }
  const id = basename(Cypress.spec.name).split('.')[0];

  cy.log('id', id);

  if (!isString(id) || isEmpty(id)) {
    return cy.log(
      'cy.lighthouse()',
      `${id} is not a valid String. Skipping...`,
    );
  }

  cy.url().then((url) => {
    cy.task(
      'lighthouse',
      {
        id,
        url,
        configPath: Cypress.env('configPath'),
      },
      taskOptions,
    ).then(({ isSuccessfulRun }) => {
      if (!isSuccessfulRun) {
        throw new Error(`Lighthouse test failed for ${id}`);
      }
    });
  });
});
