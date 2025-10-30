
class Menu {
    toLogin(){
        cy.get('a[href = "/login"]').click()
    }

    doLogout(){
         cy.get('a[href="/logout"]').should('be.visible').click()
    }
}

export default new Menu()