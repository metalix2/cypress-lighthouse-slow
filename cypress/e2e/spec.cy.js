/// <reference types="cypress" />
context('perf cypress', () => {
  before(() => {
    cy.visit('https://example.cypress.io')    
  });

  describe(
    // eslint-disable-next-line jest/valid-describe-callback
    'example',
    {
      taskTimeout: 1200000, // overrides default 60s, too little time to finish lighthouse tests
    },
    () => {
      it('should be fast', () => {
        cy.lighthouse();
      });
    },
  );
});
