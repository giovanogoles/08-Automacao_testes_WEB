// describe or context - set or series of tests in the same file
// it - a test within a block or a set of tests 


/// <reference types = "cypress"/>

describe('Automation Exercise', () => {
    const timestamp = new Date().getTime()
    it('User register', () => {
        // Arrange
        // In the homepage
        cy.visit('https://automationexercise.com/')
        cy.get('a[href = "/login"]').click()
        cy.get('[data-qa="signup-name"]').type('QA Tester')
        cy.get('[data-qa="signup-email"]').type(`qa-tester-${timestamp}@test.com`)
        cy.contains('button','Signup').click();

        // In the signup page
        cy.get('#id_gender1').check()
        cy.get('input#password').type('12345', {log: false})
        cy.get('select#days').select('22')
        cy.get('select#months').select('12')
        cy.get('select#years').select('1990')

        cy.get('input[type=checkbox]#newsletter').check()
        cy.get('input[type=checkbox]#optin').check()

        cy.get('input#first_name').type('QA')
        cy.get('input#last_name').type('Tester')
        cy.get('input#company').type('Bob')
        cy.get('input#address1').type('Av.Narciso, n 2004')
        cy.get('input#address2').type('home')
        cy.get('select#country').select('Canada')
        cy.get('input#state').type('California')
        cy.get('input#city').type('Los Angeles')
        cy.get('input#zipcode').type('9001')
        cy.get('input#mobile_number').type('111 222 333')

        //Act
        cy.get('[data-qa="create-account"]').click()

        //Assert
        cy.url().should('includes','account_created')
        cy.contains('b','Account Created!')
        cy.get('h2[data-qa="account-created"]').should('have.text','Account Created!')
    })

})
