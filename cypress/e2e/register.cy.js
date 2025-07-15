describe('Register Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8100/register');
  });

  it('completa el formulario seleccionando Femenino, fecha 5-12-1994, país Chile', () => {
    cy.typeShadow('ion-input[name="nombres"]', 'Kathy');
    cy.wait(800);
    cy.typeShadow('ion-input[name="apellidoPaterno"]', 'Perez');
    cy.wait(800);
    cy.typeShadow('ion-input[name="apellidoMaterno"]', 'Gomez');
    cy.wait(800);

    // Seleccionar género Femenino
    cy.waitForBackdrop();
    cy.get('ion-select[name="genero"]').click({ force: true });
    cy.wait(800);
    cy.get('ion-alert').within(() => {
      cy.contains('Femenino').click({ force: true });
      cy.wait(800);
      cy.contains('OK').click({ force: true });
    });
    cy.waitForBackdrop();
    cy.wait(800);

    // Fecha nacimiento 5-12-1994
    cy.get('ion-datetime[name="fechaNacimiento"]').then($el => {
      $el[0].value = '1994-12-05';
      $el[0].dispatchEvent(new Event('ionChange', { bubbles: true }));
      $el[0].dispatchEvent(new Event('change', { bubbles: true }));
    });
    cy.wait(800);

    cy.typeShadow('ion-input[name="email"]', 'kathy@example.com');
    cy.wait(800);

    // Código país
    cy.waitForBackdrop();
    cy.get('ion-select[name="codigoPais"]').click({ force: true });
    cy.wait(800);
    cy.contains('+56').click({ force: true });
    cy.wait(300);

    // 👇 fuerza un click afuera para cerrar la ventanita
    cy.get('body').click(0,0);
    cy.waitForBackdrop();
    cy.wait(800);

    // Teléfono
    const phoneNumber = '9' + Math.floor(10000000 + Math.random() * 90000000).toString();
    cy.typeShadow('ion-input[name="telefono"]', phoneNumber);
    cy.wait(800);

    // País Chile
    cy.waitForBackdrop();
    cy.get('ion-select[name="pais"]').click({ force: true });
    cy.wait(800);
    cy.get('ion-alert').within(() => {
      cy.contains('Chile').click({ force: true });
      cy.wait(800);
      cy.contains('OK').click({ force: true });
    });
    cy.waitForBackdrop();
    cy.wait(800);

    // Contraseña
    cy.typeShadow('ion-input[name="contrasena"]', 'K123456@');
    cy.wait(800);
    cy.typeShadow('ion-input[name="confirmarContrasena"]', 'K123456@');
    cy.wait(800);

    cy.waitForBackdrop();
    cy.get('ion-button[type="submit"]').click({ force: true });

    // ✅ Asegura que está en el login
    cy.url().should('include', '/login');
    cy.contains('Iniciar sesión', { timeout: 10000 }).should('be.visible');
    cy.waitForBackdrop();
  });
});
