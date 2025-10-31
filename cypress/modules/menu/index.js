import { faker } from "@faker-js/faker"
class Menu {
    toLogin(){
        cy.visit('https://automationexercise.com/')
        cy.get('a[href = "/login"]').click()
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

        cy.get('[data-qa="name-on-card"]').type(faker.finance.accountName())
        cy.get('[data-qa="card-number"]').type(faker.finance.creditCardNumber())
        cy.get('[data-qa="cvc"]').type(faker.finance.creditCardCVV())
        cy.get('[data-qa="expiry-month"]').type(faker.date.month())
        cy.get('[data-qa="expiry-year"]').type('2035')
        cy.get('[data-qa="pay-button"]').click()
    }

}

export default new Menu()