// cypress/e2e/functional_tests.js
describe('Functional Test – User Login Flow', () => {
  it('should log in as User and navigate to the user home page', () => {
    cy.visit('/login');
    cy.get('input[name="email"]').type('nawa@gmail.com');
    cy.get('input[name="password"]').type('nawa');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/');
    cy.get('h1').should('contain', 'Welcome, Nawa');
  });

  it('should log in as Admin and navigate to the admin dashboard', () => {
    cy.visit('/login');// cypress/e2e/api_tests.cy.js
    describe('API Test – Verify Login API Response', () => {
      it('should return a valid response with user and token for correct credentials', () => {
        cy.request({
          method: 'POST',
          url: 'http://localhost:5000/users/login',  // Updated to backend URL
          body: {
            email: 'nawa@gmail.com',
            password: 'nawa'
          },
          failOnStatusCode: false  // Allow tests to continue on 404 or other non-2xx status codes
        }).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.have.property('user');
          expect(response.body).to.have.property('token');
        });
      });
    
      it('should return an error for incorrect credentials', () => {
        cy.request({
          method: 'POST',
          url: 'http://localhost:5000/users/login',  // Updated to backend URL
          body: {
            email: 'wrongemail@gmail.com',
            password: 'wrongpassword'
          },
          failOnStatusCode: false  // Allow tests to continue on 404 or other non-2xx status codes
        }).then((response) => {
          expect(response.status).to.eq(400);  // Adjust status code based on API error handling
        });
      });
    });
    
    cy.get('input[name="email"]').type('admin@gmail.com');
    cy.get('input[name="password"]').type('admin');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/AdminHomePage');
    cy.get('h1').should('contain', 'Admin Dashboard');
  });

  it('should log in as Driver and navigate to the driver dashboard', () => {
    cy.visit('/login');
    cy.get('input[name="email"]').type('udara@gmail.com');
    cy.get('input[name="password"]').type('udara');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/driverHomePage');
    cy.get('h1').should('contain', 'Driver Dashboard');
  });
});
