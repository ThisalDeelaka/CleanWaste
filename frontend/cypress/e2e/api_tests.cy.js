// cypress/e2e/api_tests.cy.js
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
