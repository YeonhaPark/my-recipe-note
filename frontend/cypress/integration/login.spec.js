describe('renders the login page', () => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjMwMjg2MDUyLCJleHAiOjE2MzAzNzI0NTJ9.wdWy812UM-ZpFB-HykYSRJ6u32slHDgZbv8fOIWNi4U';
  beforeEach(() => {
    cy.then(() => {
      window.localStorage.setItem('token', token);
    });
  });
  beforeEach(() => {
    cy.visit('/login');
  });
  it('renders correctly', () => {
    cy.get('#loginForm').should('exist');
  });
});
