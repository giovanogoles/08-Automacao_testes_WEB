// describe or context - set or series of tests in the same file
// it - a test within a block or a set of tests 


/// <reference types = "cypress"/>


import userData from '../fixtures/example.json'
import { getRandomNumber, getRandomEmail } from '../support/helpers';

import {faker} from '@faker-js/faker'

describe('Automation Exercise', () => {
    const timestamp = new Date().getTime()

    /* it('Log Examples', () => {
        cy.log(`STEP 01 :: VIEW FIXTURES`)
        cy.log(`User Name: ${userData.name}`)
        cy.log(`User Email: ${userData.email}`)
        
        });
    */ 
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

        cy.get('input#first_name').type(faker.person.firstName())
        cy.get('input#last_name').type(faker.person.lastName())
        cy.get('input#company').type(faker.company.name())
        cy.get('input#address1').type(faker.location.streetAddress())
        cy.get('input#address2').type(faker.location.secondaryAddress())
        cy.get('select#country').select('Canada')
        cy.get('input#state').type(faker.location.state())
        cy.get('input#city').type(faker.location.city())
        cy.get('input#zipcode').type(faker.location.countryCode())
        cy.get('input#mobile_number').type('111 222 333')

        //Act
        cy.get('[data-qa="create-account"]').click()

        //Assert
        cy.url().should('includes','account_created')
        cy.contains('b','Account Created!')
        cy.get('h2[data-qa="account-created"]').should('have.text','Account Created!')
    })

})

describe('Contact Us', () => {
    it('Sending form with attach file', () => {
        cy.visit('https://automationexercise.com/')
        cy.get('a[href="/contact_us"]').click()
        cy.get('[data-qa="name"]').type(`${userData.name}`)
        cy.get('[data-qa="email"]').type(`${userData.email}`)
        cy.get('[data-qa="subject"]').type(`${userData.subject}`)
        cy.get('[data-qa="message"]').type(`${userData.Message}`)

        cy.fixture('example.json').as('file')
        cy.get('input[type=File]').selectFile('@file')

        cy.get('[data-qa="submit-button"]').click()

        cy.get('.status').should('be.visible')
        cy.get('.status').should('have.text','Success! Your details have been submitted successfully.')
    });
    
});
