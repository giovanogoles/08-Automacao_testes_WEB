class Contact{
        ContactUS(){
        cy.visit('https://automationexercise.com/')
        cy.get('a[href="/contact_us"]').click()
        }
}

export default new Contact