# VoucherPurchaseFlow
Voucher Purchase Flow - End-to-End UI Test Cases

Readme
This document outlines a set of UI test cases designed to validate the voucher purchasing flow on your platform. It covers the main purchase scenarios, including buying for oneself and for someone else, along with edge cases to ensure robust functionality.

Demo Salon: https://gift-cards.phorest.com/salons/demous

Test Data:
•	Credit Card Number: 4111 1111 1111 1111 (Test Card)
•	Expiry Date: 12/25
•	CVC: 999
•	Zip Code: 92606

Tools:
•	Manual testing (alternative: automated testing tools like Cypress)
•	Email checker (optional: dedicated email testing tool)

Test Cases:

1. Purchase a Voucher for Yourself:
1.1. Select a gift card value. 
1.2. Fill in your email, first name and last name.
1.3. Click “Checkout”
1.4. The Order summary page accurately reflects voucher details and amount.
1.5. Click “Confirm Details”
1.6. Proceed to checkout. 
1.7. Enter test credit card details.
1.8. Click “Submit”
1.9. Review the order on the Purchase Complete page after successful payment.
Expected Result:
•	User can select the desired voucher amount.
•	User entered recipient details.
•	User can click the Checkout button.
•	User can click the Confirm Details button.
•	User can enter payment details.
•	User can click the submit button.
•	Order summary accurately reflects voucher details and quantity.
•	Purchase Complete page is successful with a confirmation message, gift card code and gift card value.

2. Purchase a Voucher for Someone Else:
2.1. Select a gift card value. 
2.2. Select the "Send to someone else" tab. 
2.3. Fill in your email, first name, last name, Recipient Email and Message for Recipient.
2.4. Follow steps 1.3 to 1.9 from Test Case 1. 
Expected Result:
•	Same as Test Case 1, with the addition of:
•	User can enter own and recipient's details.

3. Email Delivery Test:
3.1. Access the recipient's email account used in Test Case 2. 
3.2. Search for an email with the subject line indicating a voucher purchase. 
3.3. Open the email and verify the content includes: * Voucher details (amount) * Sender information (sender’s name) * Personalized message 
Expected Result:
•	Confirmation email is received by the recipient with accurate voucher information.
-Verify that an email is delivered to the recipient's email address after successful purchase.
-Check the content of the email for accuracy (e.g., voucher details, purchase confirmation).

Edge Cases:
4. Test purchasing a voucher with an invalid payment method 
Expected Result:
•	System displays an error message explaining the issue and prevents adding the voucher to the cart.
5. Invalid Credit Card Details: 
Expected Result:
•	System displays an error message indicating the specific credit card issue and prevents completing the purchase.
6. Insufficient Funds (Optional): This test requires a separate credit card with an insufficient balance. 
Expected Result:
•	System displays an error message indicating a payment failure and prevents completing the purchase.

7. Test purchasing a voucher with the maximum allowable amount.
8. Test purchasing a voucher with the minimum allowable amount.

Bug Report: Voucher Purchase - Invalid Credit Card Error
Test Case: 5. Test purchasing a voucher with an invalid payment method.
Description: 
This bug report details an issue encountered during a voucher purchase using a credit card with invalid details. The provided test credit card number might be invalid or have other issues to allow successful payment processing.
Steps to Reproduce:
1.	Select the desired voucher value, fill out details and proceed to checkout (steps 1.1 to 1.6 of Test Case 1).
2.	Enter the following incorrect credit card details: 
o	Number: 4111 1111 1111 1111 
o	Expiry Date: 12/25
o	CVC: 999
o	Zip Code: 92606
3.	Click the “Submit” button to complete the purchase.
Expected Result:
The system should display an error message indicating the specific credit card issue (e.g., "Invalid Credit Card Number") and prevent completing the purchase.
Observed Result:
The observed behaviour is unclear. The system does not recognize the error and process the payment.
Impact:
This bug can lead to a frustrating user experience if the purchase attempt continues despite an invalid card.
Severity: Medium
This bug hinders a core functionality (payment processing) but does not crash the system.
Recommendation:
•	Implement credit card validation checks to identify invalid card numbers based on the Luhn Algorithm or similar methods.
•	Provide clear error messages to the user, specifically mentioning the credit card issue (e.g., "Invalid Credit Card Number").
Additional Notes:
•	The original test document provides this test credit card number (4111 1111 1111 1111) for testing purposes. This bug report highlights the scenario with an intentionally incorrect number to expose the potential validation issue.
