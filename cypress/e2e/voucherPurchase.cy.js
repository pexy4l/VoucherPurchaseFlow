// voucherPurchasePage.js
export default class VoucherPurchasePage {
  constructor(page) {
    this.page = page;
  }

  selectVoucher(amount) {
    return this.page.get(`#option${amount}`).check();
  }

  fillPurchaserDetails(firstName, lastName, email) {
    return this.page
      .get('[data-target="email.purchaserEmailInput"]').type(email)
      .get('.pr-1 > input').type(firstName)
      .get('.pl-1 > input').type(lastName);
  }

  fillCreditCard(cardNumber, expiry, cvc) {
    return this.page
      .get('iframe[name*="privateStripeFrame"]', { timeout: 10000 })
      .should('exist')
      .scrollIntoView()
      .then(($iframe) => {
        const iframe = $iframe.get(0).contentDocument;
        return cy
          .wrap(iframe)
          .find('span[data-max="4242 4242 4242 4242 4240"]')
          .type(cardNumber)
          .get('span[data-max="MM / YY0"]')
          .type(expiry)
          .get('span[data-max="00000"]')
          .type(cvc);
      });
  }

}

describe('Voucher Purchase', () => {
  it('Purchase a Voucher for Yourself', () => {
    const voucherPurchasePage = new VoucherPurchasePage(cy);

    cy.visit('https://gift-cards.phorest.com/salons/demous');

    // fill out details to purchase a voucher
    voucherPurchasePage.selectVoucher(100);
    voucherPurchasePage.fillPurchaserDetails('John','Doe','pekunapara@gmail.com');
    cy.get('.container > .flex > .w-btn-sm').click();

    // Add assertions to verify summary page
    cy.get('#confirm-voucher-value').should('contain', '$100.00'); // Verify Value of gift card
    cy.get('#confirm-payment-amount').should('contain', '$100.00'); // Verify total cost
    cy.get('#confirm-purchaser-email').should('contain', 'pekunapara@gmail.com'); // Verify email to send receipt to
    cy.get('#confirm-recipient-email').should('contain', 'pekunapara@gmail.com'); // Verify email to send gift card to
    cy.get('.container > .mx-auto').click();

    // fill out credit card details
    cy.wait(10000)
    //fill in Credit Card details
    cy
      .get('iframe[name*="privateStripeFrame"', {timeout: 10000}).should('exist')
      .scrollIntoView()
      .then(($iframe) => {
        const iframe = $iframe.get(0).contentDocument;
        
        const input = cy.wrap(iframe).find('span[data-max="4242 4242 4242 4242 4240"]');
        input.type(4111111111111111)
        
        const input1 = cy.wrap(iframe).find('span[data-max="MM / YY0"]');
        input1.type(1224)
        
        const input2 = cy.wrap(iframe).find('span[data-max="00000"]');
        input2.type(999)
      }) 
    cy.get('#stripe-form > .mt-5').click();

    // Add assertions to verify purchase completion page
    cy.get('.text-xl.font-bold').invoke('text').should('match', /\d+/); // Verify gift card number
    cy.get('.mb-8.text-3xl').should('contain', '$100.00'); // Verify gift card value
    cy.get('.btn').click();
  });
});
