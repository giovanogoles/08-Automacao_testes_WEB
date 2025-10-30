// describe or context - set or series of tests in the same file
// it - a test within a block or a set of tests 


/// <reference types = "cypress"/>


import userData from '../fixtures/example.json'
import { getRandomNumber, getRandomEmail } from '../support/helpers';

import {faker} from '@faker-js/faker'

import { Menu } from '../modules/menu'
import { Login } from '../modules/login'
import { Register } from '../modules/register'
//import {toLogin} from '../modules/menu'
//import {writeFormPreRegister} from '../modules/login'
// import {writeRegister} from '../modules/register'

describe('Automation Exercise', () => {
    beforeEach(() => {
        cy.visit('https://automationexercise.com/')   
        Menu.toLogin()
    });
    it('User Register', () => {
        Login.writeFormPreRegister()
        Register.writeCompleteRegister()
    });

    //Assert
        cy.url().should('includes','account_created')
        cy.contains('b','Account Created!')
        cy.get('h2[data-qa="account-created"]').should('have.text','Account Created!')
})

describe('Test Case 01: Login', () => {
        it('Login Success with email and password', () => {
        
        Login.toLogin(userData.user, userData.password)

        cy.get('[data-qa="login-button"]').click()

        cy.get('i.fa-user').parent().should('contain', userData.name)
        cy.get('a[href="/logout"]').should('be.visible')
    })

    it('Login Invalid with email and password', () => {
        
        Login.toLogin(userData.user, '54321')
        
        cy.get('.login-form > form > p').should('contain','Your email or password is incorrect!')
    })

    it('Logout User', () => {

        Login.toLogin(userData.user, userData.password)
        Menu.doLogout()

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

describe('Contact Us', () => {
    it('Sending form with attach file', () => {
        cy.visit('https://automationexercise.com/')
        
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
