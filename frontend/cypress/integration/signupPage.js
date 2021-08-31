// check after clearing token, signing up properly returns token
describe('renders the signup page', () => {
  beforeEach(() => {
    cy.visit('/signup');
  });
  it('renders correctly', () => {
    cy.get('#signupForm').should('exist');
  });

  // it('existing user returns 409', () => {
  //   const username = 'yeoni5@gmail.com';
  //   const password = 'yeoniyeoni5';

  //   cy.request({
  //     method: 'POST',
  //     url: 'http://localhost:8081/auth/signup',
  //     body: {
  //       username,
  //       password,
  //     },
  //     failOnStatusCode: false,
  //   }).then((result) => {
  //     expect(result.status).to.eq(409);
  //   });
  // });

  // it('new user returns 200', () => {
  //   const username = 'yeoni10@gmail.com';
  //   const password = 'yeoniyeoni10';

  //   cy.request({
  //     method: 'POST',
  //     url: 'http://localhost:8081/auth/signup',
  //     body: {
  //       username,
  //       password,
  //     },
  //   }).then((result) => {
  //     expect(result.status).to.eq(200);
  //   });
  // });

  it('after signing up, move to login page', () => {
    const username = 'yeoni5@gmail.com';
    const password = 'yeoniyeoni5';

    cy.get('form input#ID')
      .clear()
      .type(username)
      .get('form input#Password')
      .clear()
      .type(password)
      .get('form input[id="Retype Password"]')
      .clear()
      .type(password)
      .get('button[type=submit]')
      .click();
    cy.url().should('include', '/login');
  });
});
