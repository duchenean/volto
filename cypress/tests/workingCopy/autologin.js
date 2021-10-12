describe('Autologin Tests', () => {
  it('Autologin as an standalone test', function () {
    const api_url = 'http://localhost:55001/plone';
    const user = 'admin';
    const password = 'secret';

    cy.request({
      method: 'POST',
      url: `${api_url}/@login`,
      headers: { Accept: 'application/json' },
      body: { login: user, password: password },
    }).then((response) => cy.setCookie('auth_token', response.body.token));

    cy.visit('/');
    cy.get('#toolbar-personal').click();
    cy.get('#toolbar-logout');
  });
});
