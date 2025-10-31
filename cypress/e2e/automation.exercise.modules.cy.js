// describe or context - set or series of tests in the same file
// it - a test within a block or a set of tests 


/// <reference types = "cypress"/>


import data from '../fixtures/example.json'
const userData = data.userData
const contact = data.contact


import { getRandomNumber, getRandomEmail } from '../support/helpers';

import {faker} from '@faker-js/faker'

import Menu from '../modules/menu'
import Login from '../modules/login'
import Register from '../modules/register'
import Contact from '../modules/contact'
import Footers from '../modules/Footer'

//import {toLogin} from '../modules/menu'
//import {writeFormPreRegister} from '../modules/login'
// import {writeRegister} from '../modules/register'

describe('Test Case 01', () => {
    it('User Register', () => {
        cy.visit('https://automationexercise.com/')
        cy.get('a[href = "/login"]').should('be.visible').click()
        
        Login.writeFormPreRegister()
        Register.writeCompleteRegister()
    
    //Assert
        cy.url().should('includes','account_created')
        cy.contains('b','Account Created!')
        cy.get('h2[data-qa="account-created"]').should('have.text','Account Created!')
    })
});
describe('Test Case 02', () => {
  it('Login Success with email and password', () => {
    Menu.toLogin()

    cy.get('[data-qa="login-email"]').type(userData.email)
    cy.get('[data-qa="login-password"]').type(userData.password)
    cy.get('[data-qa="login-button"]').click()

    cy.get('i.fa-user').parent().should('contain', userData.name)
    cy.get('a[href="/logout"]').should('be.visible')
  })
});


describe('Test Case 03', () => {
    it('Login Invalid with email and password', () => {
        
        Menu.toLogin()
        cy.get('[data-qa="login-email"]').type(userData.email)
        cy.get('[data-qa="login-password"]').type('54321')
        
        cy.get('[data-qa="login-button"]').click()

        cy.get('.login-form > form > p').should('contain','Your email or password is incorrect!')
    })
});
describe('Test Case 04', () => {
    it('Logout User', () => {

        Menu.toLogin()
        cy.get('[data-qa="login-email"]').type(userData.email)
        cy.get('[data-qa="login-password"]').type(userData.password)
        cy.get('[data-qa="login-button"]').click()
        
        cy.get('i.fa-user').parent().should('contain','QA Tester')
        Menu.doLogout()

        cy.url().should('contain','login')
    })
});

describe('Test Case 05', () => {
    it('Register User with existing email', () => {
        Menu.toLogin()
        cy.get('[data-qa="signup-name"]').type(userData.name)
        cy.get('[data-qa="signup-email"]').type(userData.email)

        cy.contains('button','Signup').click();

        cy.get('.signup-form > form > p').should('contain','Email Address already exist!')
    })
});

describe('Test Case 06', () => {
    it('Sending form with attach file', () => {
        Contact.ContactUS()
        
        cy.get('[data-qa="name"]').type(`${userData.name}`)
        cy.get('[data-qa="email"]').type(`${userData.email}`)
        cy.get('[data-qa="subject"]').type(`${contact.subject}`)
        cy.get('[data-qa="message"]').type(`${contact.message}`)

        cy.fixture('example.json').as('file')
        cy.get('input[type=File]').selectFile('@file')

        cy.get('[data-qa="submit-button"]').click()

        cy.get('.status').should('be.visible')
        cy.get('.status').should('have.text','Success! Your details have been submitted successfully.')
    });
    
});

describe('Test Case 08', () => {
    it('Click on products and see details', () => {
        
        cy.visit('https://automationexercise.com/')
        Menu.viewProduct()
    
        cy.get('.title').should('contain','All Products')
        cy.get('input#search_product').should('be.visible')

        Menu.detailProduct()
        cy.get('.product-information > h2').should('be.visible')
        cy.get('.product-information > h2').should('have.text','Blue Top')


        cy.get('.product-information').should('be.visible').within(() =>{
            cy.contains('Category: Women > Tops')
            cy.contains('Rs. 500')
            cy.contains('Availability:').parent().should('contain', 'In Stock')
            cy.contains('Condition:').parent().should('contain', 'New')
            cy.contains('Brand:').parent().should('contain', 'Polo')
        })
    });
});
describe('Test Case 09', () => {
    it('Search Product', () => {
        cy.visit('https://automationexercise.com/')
        Menu.viewProduct()
    
        cy.get('.title').should('contain','All Products')
        cy.get('input#search_product').should('be.visible')
        cy.get('input#search_product').type('T-Shirt')
        cy.get('#submit_search').click()

        cy.get('.title').should('contain','Searched Products')
        
        cy.get('.productinfo > p').each(($el) => {
        cy.wrap($el).should('contain.text', 'T-Shirt')
        });
    });
});
describe('Test Case 10', () => {
    it('Scroll to Subscription', () => {
        Footers.toSubscription()
        cy.get('#susbscribe_email').should('be.visible')
        cy.get('#susbscribe_email').type(getRandomEmail())
        cy.get('#subscribe').click()

        cy.get('.alert-success').should('be.visible')
        cy.get('.alert-success').should('have.text', 'You have been successfully subscribed!')
    });
});
describe('Test Case 15', () => {
    it('Register Before Checkout', () => {
        
        Menu.toLogin()
        Login.writeFormPreRegister()
        Register.writeCompleteRegister()

        cy.url().should('includes','account_created')
        cy.contains('b','Account Created!')
        // ... (resto do seu teste)
        cy.get('[data-qa="continue-button"]').click()
        
        Menu.viewProduct()

        cy.get('.title').should('contain','All Products')
        cy.get('input#search_product').should('be.visible')
        cy.get('input#search_product').type('T-Shirt')
        cy.get('#submit_search').click()

        Menu.addProductToCart(30);

        cy.get('.modal-footer > .btn').click()
        
        Menu.viewCart()

        cy.get('h4 > a').should('contain', 'T-Shirt')
        cy.get('a.btn.check_out').click();

        cy.get('#address_delivery > .address_title > .page-subheading').should('be.visible').should('exist')
        
        
        cy.then(() => {
            
            const userName = Cypress.env('userName');
            const company = Cypress.env('company');
            const address1 = Cypress.env('address1');
            const address2 = Cypress.env('address2');
            const state = Cypress.env('state');
            const city = Cypress.env('city');
            const zipcode = Cypress.env('zipcode');
            const mobile = Cypress.env('mobile');

            /* cy.get('#address_delivery > .address_firstname').should('be.visible').should('contain',`\Mr. ${userName}`)
            cy.contains(company).should('exist');
            cy.contains(address1).should('exist');
            cy.contains(address2).should('exist');
            cy.contains(state).should('exist');
            cy.contains(city).should('exist');
            cy.contains('Canada').should('exist');
            cy.contains(zipcode).should('exist');
            cy.contains(mobile).should('exist');
        */

        cy.contains('h2.heading', 'Review Your Order').should('be.visible');
        cy.get('h4 > a').should('contain.text', 'T-Shirt')

        cy.get('.form-control').type('ok, obrigado! Te vejo em breve')
        cy.get('a[href="/payment"]').click()
        
        Menu.getPayment()
        /*cy.get('#success_message', { timeout: 10000 })
        .should('exist')
        .then(($el) => {
            const message = $el.text();
            expect(message).to.include('Your order has been placed successfully!');
        });
        //cy.get('#success_message').should('be.visible').and('have.text','Your order has been placed successfully!')
        
*/
        });
    });
});
