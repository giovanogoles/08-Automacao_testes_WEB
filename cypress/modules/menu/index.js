import { faker } from "@faker-js/faker"
import { should } from "chai"
class Menu {
    toLogin(){
        cy.visit('https://automationexercise.com/')
        cy.get('a[href = "/login"]').should('be.visible').click()
    }

    doLogout(){
         cy.get('a[href="/logout"]').should('be.visible').click()
    }

    viewProduct(){
        cy.get('a[href = "/products"]').click()
    }

    detailProduct(){
        cy.get('a[href = "/product_details/1"]').click()
    }

    addProductToCart(productId) {
    cy.get(`.productinfo a[data-product-id="${productId}"]`).click();
    }

    viewCart(){
    cy.get('a[href="/view_cart"]').should('be.visible').first().click();
    }

    getPayment(){
        cy.url().should('include', '/payment');

        cy.get('[data-qa="name-on-card"]').should('be.visible').type(faker.finance.accountName())
        cy.get('[data-qa="card-number"]').should('be.visible').type(faker.finance.creditCardNumber())
        cy.get('[data-qa="cvc"]').should('be.visible').type(faker.finance.creditCardCVV())
        cy.get('[data-qa="expiry-month"]').should('be.visible').type(faker.date.month())
        cy.get('[data-qa="expiry-year"]').should('be.visible').type('2035')
        cy.get('[data-qa="pay-button"]').should('be.visible').click()
    }
}

export default new Menu()