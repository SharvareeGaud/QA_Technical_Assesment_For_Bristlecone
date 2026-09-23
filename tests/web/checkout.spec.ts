import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { CartPage } from '../../pages/CartPage';

test.describe('End-to-End Shopping & Checkout', () => {
  test('Positive: complete full purchase cycle (Catalog -> Cart -> Place Order)', async ({ page }) => {
    const homePage = new HomePage(page);
    const cartPage = new CartPage(page);

    await homePage.navigate();

    // 1. Filter by Laptops category
    await homePage.selectCategory('Laptops');

    // 2. Select product and add to cart
    await homePage.selectProduct('Sony vaio i5');
    const alertMessage = await homePage.addCurrentProductToCart();
    expect(alertMessage).toBe('Product added');

    // 3. Navigate to Cart & verify product is present
    await homePage.goToCart();
    await expect(cartPage.cartItems.first()).toBeVisible();
    await expect(cartPage.cartItems).toContainText(['Sony vaio i5']);

    // 4. Place order
    await cartPage.placeOrderButton.click();
    await cartPage.placeOrderModal.fillOrder({
      name: 'Sharvaree Test',
      country: 'India',
      city: 'Nagpur',
      creditCard: '4111222233334444',
      month: '12',
      year: '2028',
    });
    await cartPage.placeOrderModal.submitOrder();

    // 5. Verify confirmation modal
    await expect(cartPage.placeOrderModal.confirmationModal).toBeVisible();
    await expect(cartPage.placeOrderModal.confirmationDetails).toContainText('Amount: 790 USD');
    await cartPage.placeOrderModal.confirmOkButton.click();
  });
});