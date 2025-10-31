

// tests/modalTests.js
import ModalPage from '/pageObjects/modalPage';

describe('Modal Tests', () => {
    beforeEach(() => {
        cy.visit('https://devfinance-agilizei.netlify.app/#');
    });

    it('should open the new transaction modal when the button is clicked', () => {
        ModalPage.openNewTransaction();
        cy.get('div.modal').should('be.visible');
    });

    it('should not display the modal when the button is not clicked', () => {
        cy.get('div.modal').should('not.exist');
    });

    it('should have the correct button text for new transaction', () => {
        cy.get(ModalPage.newTransactionButton).should('have.text', '+ Nova Transação');
    });

    /*it('should close the modal when clicking outside of it', () => {
        ModalPage.openNewTransaction();
        cy.get('div.modal').should('be.visible');
        cy.get('body').click(0, 0); // Click outside the modal
        cy.get('div.modal').should('not.exist');
    });
    */ 
});