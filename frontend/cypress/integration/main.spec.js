describe('renders main page', () => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwia…5NjF9.VDG7DbpGSEaTUjS3lcvjJ54HXbqHP1H6J2G_EVtYSFY';
  beforeEach(() => {
    cy.window().then((window) => {
      window.localStorage.setItem('token', token);
    });
  });
  beforeEach(() => {
    cy.visit('/main');
  });

  it('if token, renders successfully', () => {
    cy.url().should('include', '/main');
  });
  it('after visiting, call api', () => {
    cy.intercept('GET', '/recipes', { statusCode: 200 });
  });
});
