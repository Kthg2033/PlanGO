describe('Tareas Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8100/tareas');
  });

  it('crea tarea completa, la guarda y la marca', () => {
    cy.wait(800);

    cy.get('ion-icon[name="add"]').click({ force: true });
    cy.wait(800);

    // Nombre
    cy.get('ion-input').eq(0).find('input', { includeShadowDom: true })
      .clear({ force: true }).type('Tarea Cypress', { force: true });
    cy.wait(800);

    // Descripción
    cy.get('ion-textarea').eq(0).find('textarea')
      .type('Descripción Cypress', { force: true });
    cy.wait(800);

    // Prioridad
    cy.get('ion-select').eq(0).click({ force: true });
    cy.wait(800);
    cy.get('ion-alert, ion-popover').within(() => {
      cy.contains('Alta').click({ force: true });
      cy.contains('OK').click({ force: true });
    });
    cy.wait(800);

    // Categoría
    cy.get('ion-select').eq(1).click({ force: true });
    cy.wait(800);
    cy.get('ion-alert, ion-popover').within(() => {
      cy.contains('Productividad').click({ force: true });
      cy.contains('OK').click({ force: true });
    });
    cy.wait(800);

    // Fecha
    cy.get('ion-datetime').then($el => {
      $el[0].value = '2025-07-17';
      $el[0].dispatchEvent(new Event('ionChange', { bubbles: true }));
      $el[0].dispatchEvent(new Event('change', { bubbles: true }));
    });
    cy.wait(800);

    // Puntos
    cy.get('ion-input').first().find('input', { includeShadowDom: true })
      .clear({ force: true }).type('10', { force: true });
    cy.wait(800);

    // Notas personales
    cy.get('ion-textarea').eq(1).find('textarea')
      .type('Notas personales Cypress', { force: true });
    cy.wait(800);

    // Guardar
    cy.contains('ion-button', 'Guardar').click({ force: true });
    cy.wait(1000);

    // Dump del ion-list para depuración
    cy.get('ion-list').then($list => {
      const html = $list.get(0).outerHTML.slice(0, 200);
      cy.log('==== HTML de ion-list ====');
      cy.log(html);
    });

    // Busca la descripción (lo que realmente se muestra en la lista)
    cy.contains('body', /Descripción Cypress/i, { timeout: 10000 }).should('be.visible');

    // Imprime árbol para inspección en consola
    cy.contains('body', /Descripción Cypress/i).then($el => {
      cy.window().then(win => {
        let current = $el[0];
        for (let i = 0; i < 5 && current; i++) {
          win.console.log(`Nivel ${i}:`, current.outerHTML);
          current = current.parentElement;
        }
      });
    });

    // Marca la tarea: sube a sus padres y busca el checkbox
    cy.contains('body', /Descripción Cypress/i)
      .parentsUntil('ion-list')
      .find('ion-checkbox')
      .click({ force: true });

    // Verifica que siga visible
    cy.contains('body', /Descripción Cypress/i, { timeout: 10000 }).should('be.visible');
  });
});
