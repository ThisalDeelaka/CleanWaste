// cypress/e2e/ui_tests.cy.js

describe('UI Test – Password Visibility Toggle', () => {
  it('should toggle password visibility', () => {
    cy.visit('http://localhost:3000/login');
    
    // Click on the password visibility toggle button
    cy.get('button[type="button"]').click();

    // Check if password field is revealed
    cy.get('input[name="password"]').should('have.attr', 'type', 'text');

    // Click again to hide password
    cy.get('button[type="button"]').click();
    cy.get('input[name="password"]').should('have.attr', 'type', 'password');
  });
});
