import { faker } from "@faker-js/faker"

class Register {
    writeCompleteRegister(){
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
    }
}

export default new Register()