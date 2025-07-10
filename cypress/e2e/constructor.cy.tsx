/// <reference types="cypress" />

beforeEach(() => {
  cy.fixture('ingredients.json').then((mockIngredients) => {
    cy.intercept('GET', '/api/ingredients', {
      statusCode: 200,
      body: mockIngredients
    }).as('getIngredients');
  });

  cy.visit('http://localhost:4000');

  cy.wait('@getIngredients');
  cy.contains('Краторная булка N-200i');
});

afterEach(() => {
  cy.clearCookies();
  cy.clearLocalStorage();
});

describe('добавление ингредиентов в конструктор', () => {
  it('добавление булок', () => {
    cy.contains('Краторная булка N-200i')
      .closest('[data-testid="ingredient_card"]')
      .find('button')
      .click();
    cy.get('[data-testid="burger_bun"]').should(
      'contain',
      'Краторная булка N-200i'
    );
  });

  it('добавление начинки', () => {
    cy.contains('Говяжий метеорит (отбивная)')
      .closest('[data-testid="ingredient_card"]')
      .find('button')
      .click();
    cy.get('[data-testid="burger_main"]').should(
      'contain',
      'Говяжий метеорит (отбивная)'
    );
  });

  it('добавление соуса', () => {
    cy.contains('Соус фирменный Space Sauce')
      .closest('[data-testid="ingredient_card"]')
      .find('button')
      .click();
    cy.get('[data-testid="burger_main"]').should(
      'contain',
      'Соус фирменный Space Sauce'
    );
  });
});

describe('работа модального окна', () => {
  it('открытие поп-апа при клике на ингредиент', () => {
    cy.contains('Краторная булка N-200i').click();

    cy.get('[data-testid="ingredient_modal"]').should('be.visible');
  });

  it('закрытие поп-апа ингредиентов при клике на крестик', () => {
    cy.contains('Краторная булка N-200i').click();

    const button = cy.get('[data-testid="close_icon"]');

    button.click();
    cy.get('[data-testid="ingredient_modal"]').should('not.exist');
  });

  it('закрытие поп-апа ингредиентов при клике на оверлей', () => {
    cy.contains('Краторная булка N-200i').click();

    const overlay = cy.get('[data-testid="modal_overlay"]');

    cy.get('[data-testid="modal_overlay"]').should('exist');

    overlay.click({ force: true });
    cy.get('[data-testid="ingredient_modal"]').should('not.exist');
  });
});

describe('Создание заказа', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/auth/user', {
      statusCode: 200,
      body: {
        success: true,
        user: { email: 'efronkin@gmail.com', name: 'test user' }
      }
    }).as('getUser');

    cy.intercept('POST', '/orders', {
      statusCode: 200,
      body: { success: true, order: { number: 1234 } }
    }).as('createOrder');

    cy.setCookie('accessToken', 'test-token');
    window.localStorage.setItem('refreshToken', 'test-refresh-token');

    cy.visit('http://localhost:4000');
    cy.wait('@getUser');

    cy.get('[data-testid="make_order"]').as('makeOrderButton');
  });

  it('кнопка создания заблокирована, если в конструктор не добавлена булка', () => {
    cy.contains('Соус фирменный Space Sauce')
      .closest('[data-testid="ingredient_card"]')
      .find('button')
      .click();

    cy.contains('Говяжий метеорит (отбивная)')
      .closest('[data-testid="ingredient_card"]')
      .find('button')
      .click();
    cy.get('@makeOrderButton').should('be.disabled');
  });

  it('создание заказа с закрытием поп-апа и очисткой конструктора', () => {
    cy.fixture('userData.json').then(() => {
      cy.contains('Соус фирменный Space Sauce')
        .closest('[data-testid="ingredient_card"]')
        .find('button')
        .click();

      cy.contains('Краторная булка N-200i')
        .closest('[data-testid="ingredient_card"]')
        .find('button')
        .click();

      cy.contains('Говяжий метеорит (отбивная)')
        .closest('[data-testid="ingredient_card"]')
        .find('button')
        .click();

      cy.get('@makeOrderButton').should('not.be.disabled');
      cy.get('@makeOrderButton').click();
      cy.get('[data-testid="order_modal"]').should('be.visible');

      cy.get('[data-testid="close_icon"]').click();
      cy.get('[data-testid="order_modal"]').should('not.exist');

      cy.get('[data-testid="burger_ingredients_list"]').should(
        'not.contain',
        'Краторная булка N-200i'
      );
      cy.get('[data-testid="burger_ingredients_list"]').should(
        'not.contain',
        'Говяжий метеорит (отбивная)'
      );
      cy.get('[data-testid="burger_ingredients_list"]').should(
        'not.contain',
        'Соус фирменный Space Sauce'
      );

      cy.get('[data-testid="burger_ingredients_list"]').should(
        'contain',
        'Выберите булки'
      );
      cy.get('[data-testid="burger_ingredients_list"]').should(
        'contain',
        'Выберите начинку'
      );
    });
  });
});
