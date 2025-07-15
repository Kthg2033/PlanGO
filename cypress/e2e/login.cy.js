describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8100/login');
  });

  it('inicia sesión con correo y contraseña', () => {
    cy.wait(800);

    cy.typeShadow('ion-input[name="usuario"]', 'kathy@example.com');
    cy.wait(800);

    cy.typeShadow('ion-input[name="password"]', 'K123456@');
    cy.wait(800);

    cy.waitForBackdrop();
    cy.get('ion-button').contains('Ingresar').click({ force: true });
    cy.wait(800);

    cy.contains('Bienvenido', { timeout: 10000 }).should('be.visible');
    cy.waitForBackdrop();
  });
});
