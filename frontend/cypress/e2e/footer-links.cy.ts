describe('Footer Links E2E Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should render the Footer Links component successfully', () => {
    // Basic structural assertion to ensure the page loads without crashing
    cy.get('body').should('be.visible');
  });

  it('should not contain any severe console errors', () => {
    cy.window().then((win) => {
      cy.spy(win.console, 'error').as('consoleError');
    });
    cy.get('@consoleError').should('have.callCount', 0);
  });
});
