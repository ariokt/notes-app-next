/**
 * - Login spec
 *   - should display login page correctly
 *   - should display alert when email is empty
 *   - should display alert when user input wrong email format
 *   - should display alert when password is empty
 *   - should display alert when email and password are wrong
 *   - should display homepage when email and password are correct
 */

describe('Login spec', () => {
  it('should display login page correctly', () => {
    cy.visit('http://localhost:3000/login');

    // memverifikasi elemen yang harus ditampilkan
    cy.get('input[placeholder="Email"]').should('be.visible');
    cy.get('input[placeholder="Password"]').should('be.visible');
    cy.get('button').contains(/^Masuk$/).should('be.visible');
  });

  it('should display alert when email is empty', () => {
    cy.visit('http://localhost:3000/login');

    cy.get('button').contains(/^Masuk$/).click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('"email" is not allowed to be empty');
    });
  });

  it('should display alert when user input wrong email format', () => {
    cy.visit('http://localhost:3000/login');

    cy.get('input[placeholder="Email"]').type('ario');

    cy.get('button').contains(/^Masuk$/).click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('"email" must be a valid email');
    })
  });

  it('should display alert when password is empty', () => {
    cy.visit('http://localhost:3000/login');

    cy.get('input[placeholder="Email"]').type('ari@mail.com');

    cy.get('button').contains(/^Masuk$/).click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('"password" is not allowed to be empty');
    });
  });

  it('should display alert when email wrong', () => {
    cy.visit('http://localhost:3000/login');

    cy.get('input[placeholder="Email"]').type('testerror@anehmail.com');

    cy.get('input[placeholder="Password"]').type('testerror');

    cy.get('button').contains(/^Masuk$/).click();

    cy.on('window:alert', () => {
      expect(str).to.equal('Email not found');
    });
  });

  it('should display alert when password wrong', () => {
    cy.visit('http://localhost:3000/login');

    cy.get('input[placeholder="Email"]').type('ari@mail.com');

    cy.get('input[placeholder="Password"]').type('testerror');

    cy.get('button').contains(/^Masuk$/).click();

    cy.on('window:alert', () => {
      expect(str).to.equal('Password is wrong');
    });
  });
})