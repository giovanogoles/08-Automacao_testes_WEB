// <reference types = "cypress"/>

describe('Test Case 01: Login', () => {
    //Execute before any test
    beforeEach(() => {
        cy.visit('https://automationexercise.com/')
        cy.get('a[href = "/login"]').click()
    });

    const timestamp = new Date().getTime()
    it('Login Success with email and password', () => {
        // Arrange
        
        cy.get('[data-qa="login-email"]').type('qa-tester-1761736049617@test.com')
        cy.get('[data-qa="login-password"]').type('12345')
        cy.get('[data-qa="login-button"]').click()

        cy.get('i.fa-user').parent().should('contain','QA Tester')
        cy.get('a[href="/logout"]').should('be.visible')
    })

    it('Login Invalid with email and password', () => {
        // Arrange
        cy.get('[data-qa="login-email"]').type('qa-tester-1761736049617@test.com')
        cy.get('[data-qa="login-password"]').type('54321')
        cy.get('[data-qa="login-button"]').click()
        
        cy.get('.login-form > form > p').should('contain','Your email or password is incorrect!')
    })

    it('Logout User', () => {
        // Arrange
        cy.get('[data-qa="login-email"]').type('qa-tester-1761736049617@test.com')
        cy.get('[data-qa="login-password"]').type('12345')
        cy.get('[data-qa="login-button"]').click()

        cy.get('i.fa-user').parent().should('contain','QA Tester')
        cy.get('a[href="/logout"]').should('be.visible').click()

        cy.url().should('contain','login')
    })

    it('Register User with existing email', () => {
        // Arrange
        cy.get('[data-qa="signup-name"]').type('QA')
        cy.get('[data-qa="signup-email"]').type('qa-tester-1761736049617@test.com')

        cy.contains('button','Signup').click();

        cy.get('.signup-form > form > p').should('contain','Email Address already exist!')
    })
})