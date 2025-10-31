// pageObjects/modalPage.js
class ModalPage {
    get newTransactionButton() {
        return 'a.button.new';
    }

    openNewTransaction() {
        cy.get(this.newTransactionButton).click();
    }
}

export default new ModalPage();