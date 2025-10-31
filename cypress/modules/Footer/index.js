class Footers {
    toSubscription(){
        cy.visit('https://automationexercise.com/')
        cy.get('#subscribe').scrollIntoView().should('be.visible')
    }
}

export default new Footers