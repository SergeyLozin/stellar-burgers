/// <reference types="cypress" />

describe('Страница конструктора бургера', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');
    cy.intercept('GET', '**/api/auth/user', { fixture: 'user.json' }).as(
      'getUser'
    );
    cy.intercept('POST', '**/api/orders', { fixture: 'order.json' }).as(
      'createOrder'
    );

    cy.setCookie('accessToken', 'mock-access-token');
    localStorage.setItem('refreshToken', 'mock-refresh-token');

    cy.visit('http://localhost:4000');
    cy.wait('@getIngredients');
  });

  afterEach(() => {
    cy.clearCookie('accessToken');
    localStorage.clear();
  });

  it('должен добавлять булку в конструктор', () => {
    cy.contains('Краторная булка N-200i')
      .parents('li')
      .contains('Добавить')
      .click();

    cy.contains('Краторная булка N-200i (верх)').should('exist');
    cy.contains('Краторная булка N-200i (низ)').should('exist');
  });

  it('должен добавлять начинку в конструктор', () => {
    cy.contains('Биокотлета из марсианской Магнолии')
      .parents('li')
      .contains('Добавить')
      .click();

    cy.contains('Биокотлета из марсианской Магнолии').should('exist');
  });

  it('должен открывать модальное окно при клике на ингредиент', () => {
    cy.get('li').first().click();
    cy.contains('Детали ингредиента').should('exist');
  });

  it('должен закрывать модальное окно по клику на крестик', () => {
    cy.get('li').first().click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get('[data-cy="modal-close-btn"]').click();
    cy.contains('Детали ингредиента').should('not.exist');
  });

  it('должен закрывать модальное окно по клику на оверлей', () => {
    cy.get('li').first().click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get('[data-cy="modal-overlay"]').click({ force: true });
    cy.contains('Детали ингредиента').should('not.exist');
  });

  it('должен создавать заказ и очищать конструктор', () => {
    // Добавляем булку
    cy.contains('Краторная булка N-200i')
      .parents('li')
      .contains('Добавить')
      .click();

    // Добавляем начинку
    cy.contains('Биокотлета из марсианской Магнолии')
      .parents('li')
      .contains('Добавить')
      .click();

    // Оформляем заказ
    cy.contains('Оформить заказ').click();

    // Ждём ответа от сервера
    cy.wait('@createOrder');

    // Проверяем модальное окно
    cy.contains('12345').should('exist');

    // Закрываем модальное окно
    cy.get('[data-cy="modal-close-btn"]').click();

    // Ждём закрытия модалки
    cy.get('[data-cy="modal"]').should('not.exist');

    // Ждём обновления DOM
    cy.wait(1000);

    // Проверяем, что кнопка "Оформить заказ" существует
    cy.contains('Оформить заказ').should('exist');

    // Проверяем, что булок нет
    cy.contains('Краторная булка N-200i (верх)').should('not.exist');
    cy.contains('Краторная булка N-200i (низ)').should('not.exist');

    // Проверяем, что появились сообщения "Выберите булки" и "Выберите начинку"
    cy.contains('Выберите булки').should('exist');
    cy.contains('Выберите начинку').should('exist');
  });
});
