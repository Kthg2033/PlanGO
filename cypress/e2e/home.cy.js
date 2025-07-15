describe('Home Page - Completar evento con horas y guardar', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8100/home');
    cy.wait(800);
  });

  it('crea un evento con fecha, notas, repetir, horas y guarda', () => {
    // Seleccionar primer día con número en calendario
    cy.contains('.fc-daygrid-day', /\b\d+\b/).first().click({ force: true });
    cy.wait(1000);

    // Esperar que modal esté visible
    cy.get('body').find('ion-modal', { timeout: 20000 }).should('be.visible').wait(800);

    // Completar título
    cy.contains('Título').parent().find('input')
      .type('Evento Cypress', { force: true });
    cy.wait(800);

    // Completar ubicación
    cy.contains('Ubicación').parent().find('input')
      .type('Providencia', { force: true });
    cy.wait(800);

    // Completar notas
    cy.get('ion-modal').find('ion-textarea').first().find('textarea')
      .type('Reunión importante en Providencia.', { force: true });
    cy.wait(800);

    // Seleccionar repetir = Nunca
    cy.contains('Repetir').parent().find('ion-select').click({ force: true });
    cy.wait(1000);
    cy.get('ion-alert').contains(/^Nunca$/i).click({ force: true });
    cy.get('ion-alert').contains(/OK|Aceptar|Cerrar/i).click({ force: true });
    cy.wait(800);

    // Hora Inicio picker - abrir y esperar picker con logs
    cy.contains('Hora Inicio').parent().find('ion-datetime').click({ force: true });
    cy.wait(3000);

    cy.get('ion-picker', { timeout: 20000 }).should('exist').then($picker => {
      cy.log(`Picker HTML: ${$picker.html()}`);
    });

    cy.get('ion-picker').find('ion-picker-column').should('have.length.at.least', 1);

    cy.get('ion-picker').find('ion-picker-column').eq(0).contains('8').click({ force: true });
    cy.get('ion-picker').find('ion-picker-column').eq(1).contains('00').click({ force: true });
    cy.get('ion-picker').find('ion-picker-column').eq(2).contains('AM').click({ force: true });

    cy.get('ion-picker').find('ion-picker-button').contains(/Aceptar|OK/i).click({ force: true });
    cy.wait(800);

    // Hora Fin picker - abrir y seleccionar hora
    cy.contains('Hora Fin').parent().find('ion-datetime').click({ force: true });
    cy.wait(3000);

    cy.get('ion-picker').should('exist');
    cy.get('ion-picker').find('ion-picker-column').eq(0).contains('9').click({ force: true });
    cy.get('ion-picker').find('ion-picker-column').eq(1).contains('00').click({ force: true });
    cy.get('ion-picker').find('ion-picker-column').eq(2).contains('AM').click({ force: true });

    cy.get('ion-picker').find('ion-picker-button').contains(/Aceptar|OK/i).click({ force: true });
    cy.wait(800);

    // Guardar evento
    cy.get('ion-button').contains(/Guardar|Aceptar/i).click({ force: true });
    cy.wait(1200);

    // Verificar que evento aparece
    cy.get('.fc-event').should('exist').and('contain.text', 'Evento Cypress');
  });
});
