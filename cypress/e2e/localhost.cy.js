/// <reference types="cypress" />
context('perf localhost', () => {
  before(() => {
    cy.visit('http://localhost:5000')
  });

  describe(
    // eslint-disable-next-line jest/valid-describe-callback
    'homepage localhost',
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
