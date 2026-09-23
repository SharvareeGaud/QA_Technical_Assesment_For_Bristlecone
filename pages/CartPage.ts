import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { PlaceOrderModel } from './components/PlaceOrderModel';

export class CartPage extends BasePage {
  readonly placeOrderButton: Locator = this.page.locator('button[data-target="#orderModal"]');
  readonly cartItems: Locator = this.page.locator('#tbodyid tr');
  readonly totalPrice: Locator = this.page.locator('#totalp');
  readonly placeOrderModal: PlaceOrderModel;

  constructor(page: Page) {
    super(page);
    this.placeOrderModal = new PlaceOrderModel(page);
  }

  async deleteItem(index: number = 0) {
    const deleteLink = this.cartItems.nth(index).locator("a:text('Delete')");
    await deleteLink.click();
  }
}