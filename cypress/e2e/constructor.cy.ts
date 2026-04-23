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

    // Проверяем, что булка появилась в конструкторе
    cy.get('[data-cy="burger-constructor"]').should('contain', 'Краторная булка N-200i (верх)');
    cy.get('[data-cy="burger-constructor"]').should('contain', 'Краторная булка N-200i (низ)');
  });

  it('должен добавлять начинку в конструктор', () => {
    cy.contains('Биокотлета из марсианской Магнолии')
      .parents('li')
      .contains('Добавить')
      .click();

    // Проверяем, что начинка появилась в конструкторе
    cy.get('[data-cy="burger-constructor"]').should('contain', 'Биокотлета из марсианской Магнолии');
  });

  it('должен открывать модальное окно и показывать правильный ингредиент', () => {
    // Кликаем на первый ингредиент
    cy.get('[data-cy="ingredients-list"] li').first().click();
    
    // Проверяем, что модальное окно открылось и содержит правильный ингредиент
    cy.get('[data-cy="modal"]').should('exist');
    cy.get('[data-cy="modal"]').should('contain', 'Детали ингредиента');
    cy.get('[data-cy="modal"]').should('contain', 'Краторная булка N-200i');
  });

  it('должен закрывать модальное окно по клику на крестик', () => {
    cy.get('[data-cy="ingredients-list"] li').first().click();
    cy.get('[data-cy="modal"]').should('exist');
    cy.get('[data-cy="modal-close-btn"]').click();
    cy.get('[data-cy="modal"]').should('not.exist');
  });

  it('должен закрывать модальное окно по клику на оверлей', () => {
    cy.get('[data-cy="ingredients-list"] li').first().click();
    cy.get('[data-cy="modal"]').should('exist');
    cy.get('[data-cy="modal-overlay"]').click({ force: true });
    cy.get('[data-cy="modal"]').should('not.exist');
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

    // Проверяем, что ингредиенты в конструкторе
    cy.get('[data-cy="burger-constructor"]').should('contain', 'Биокотлета из марсианской Магнолии');

    // Оформляем заказ
    cy.contains('Оформить заказ').click();

    // Ждём ответа от сервера
    cy.wait('@createOrder');

    // Проверяем модальное окно с номером заказа
    cy.get('[data-cy="modal"]').should('exist');
    cy.contains('12345').should('exist');

    // Закрываем модальное окно
    cy.get('[data-cy="modal-close-btn"]').click();
    cy.get('[data-cy="modal"]').should('not.exist');

    // Проверяем, что конструктор очистился (булок и начинки нет)
    cy.get('[data-cy="burger-constructor"]').should('not.contain', 'Краторная булка N-200i (верх)');
    cy.get('[data-cy="burger-constructor"]').should('not.contain', 'Краторная булка N-200i (низ)');
    cy.get('[data-cy="burger-constructor"]').should('not.contain', 'Биокотлета из марсианской Магнолии');
    
    // Проверяем, что появились сообщения "Выберите булки" и "Выберите начинку"
    cy.contains('Выберите булки').should('exist');
    cy.contains('Выберите начинку').should('exist');
  });
});