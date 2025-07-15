describe('Notas Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8100/notas');
  });

  it('crea y elimina una nota seleccionando día 15, mes Julio, año 2025', () => {
    cy.wait(800);

    cy.typeShadow('ion-input', 'Mi primera nota');
    cy.wait(800);

    cy.get('ion-textarea').find('textarea').type('Nota con fecha seleccionada', { force: true });
    cy.wait(800);

    // Día 15
    cy.get('ion-select[placeholder="Día"]').click({ force: true });
    cy.wait(800);
    cy.contains(/^15$/, { timeout: 10000 }).click({ force: true }); // busca en todo el DOM
    cy.get('body').click(0, 0); // click afuera
    cy.wait(800);

    // Mes Julio
    cy.get('ion-select[placeholder="Mes"]').click({ force: true });
    cy.wait(800);
    cy.contains('Julio', { timeout: 10000 }).click({ force: true });
    cy.get('body').click(0, 0);
    cy.wait(800);

    // Año 2025
    cy.get('ion-select[placeholder="Año"]').click({ force: true });
    cy.wait(800);
    cy.contains('2025', { timeout: 10000 }).click({ force: true });
    cy.get('body').click(0, 0);
    cy.wait(800);

    // Color
    cy.get('button.dot').first().click({ force: true });
    cy.wait(800);

    // Guardar
    cy.get('ion-button').contains('Guardar').click({ force: true });
    cy.wait(800);

    // Verifica que aparece
    cy.contains('Mi primera nota').should('be.visible');
    cy.wait(800);

    // Seleccionar nota
    cy.contains('Mi primera nota').click({ force: true });
    cy.wait(800);

    // Eliminar
    cy.get('ion-button').contains('Eliminar nota seleccionada').click({ force: true });
    cy.wait(800);

    cy.contains('Mi primera nota').should('not.exist');
  });
});
