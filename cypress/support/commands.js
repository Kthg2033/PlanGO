/// <reference types="cypress" />

// ***********************************************
// Comandos personalizados para Ionic con Shadow DOM
// ***********************************************

// Escribe dentro de ion-input con Shadow DOM
Cypress.Commands.add('typeShadow', (selector, text) => {
  cy.get(selector, { includeShadowDom: true, timeout: 10000 })
    .should('exist')
    .find('input', { includeShadowDom: true })
    .should('exist')
    .type(text, { force: true });
});

// Espera a que desaparezca cualquier overlay ion-backdrop
Cypress.Commands.add('waitForBackdrop', () => {
  cy.get('ion-backdrop', { timeout: 10000 }).should('not.exist');
});
