import { faker } from "@faker-js/faker"

class Register {
    writeCompleteRegister(){
        const userData = {
            fullName: `${faker.person.firstName()} ${faker.person.lastName()}`,
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            company: faker.company.name(),
            address1: faker.location.streetAddress(),
            address2: faker.location.secondaryAddress(),
            state: faker.location.state(),
            city: faker.location.city(),
            zipcode: faker.location.zipCode(), 
            mobile: '111 222 333'
        };

        Cypress.env('userName', userData.fullName);
        Cypress.env('company', userData.company);
        Cypress.env('address1', userData.address1);
        Cypress.env('address2', userData.address2);
        Cypress.env('state', userData.state);
        Cypress.env('city', userData.city);
        Cypress.env('zipcode', userData.zipcode);
        Cypress.env('mobile', userData.mobile);

        cy.get('#id_gender1').check()
        cy.get('input#password').type('12345', {log: false})
        cy.get('select#days').select('22')
        cy.get('select#months').select('12')
        cy.get('select#years').select('1990')

        cy.get('input[type=checkbox]#newsletter').check()
        cy.get('input[type=checkbox]#optin').check()

        // 3. Use os dados do objeto para preencher o formulário
        cy.get('input#first_name').type(userData.firstName)
        cy.get('input#last_name').type(userData.lastName)
        cy.get('input#company').type(userData.company)
        cy.get('input#address1').type(userData.address1)
        cy.get('input#address2').type(userData.address2)
        cy.get('select#country').select('Canada')
        cy.get('input#state').type(userData.state)
        cy.get('input#city').type(userData.city)
        cy.get('input#zipcode').type(userData.zipcode)
        cy.get('input#mobile_number').type(userData.mobile)

        //Act
        cy.get('[data-qa="create-account"]').click()
    }
}

export default new Register()