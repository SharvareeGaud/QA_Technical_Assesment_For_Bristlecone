import { Page, Locator } from '@playwright/test';
import { BasePage } from '../BasePage';

export interface OrderDetails {
  name: string;
  country: string;
  city: string;
  creditCard: string;
  month: string;
  year: string;
}

export class PlaceOrderModel extends BasePage {
  readonly modal: Locator = this.page.locator('#orderModal');
  readonly nameInput: Locator = this.page.locator('#name');
  readonly countryInput: Locator = this.page.locator('#country');
  readonly cityInput: Locator = this.page.locator('#city');
  readonly cardInput: Locator = this.page.locator('#card');
  readonly monthInput: Locator = this.page.locator('#month');
  readonly yearInput: Locator = this.page.locator('#year');
  readonly purchaseButton: Locator = this.page.locator('button[onclick="purchaseOrder()"]');
  readonly confirmationModal: Locator = this.page.locator('.sweet-alert');
  readonly confirmationDetails: Locator = this.page.locator('.lead.text-muted');
  readonly confirmOkButton: Locator = this.page.locator('button.confirm');

  constructor(page: Page) {
    super(page);
  }

  async fillOrder(details: OrderDetails) {
    await this.modal.waitFor({ state: 'visible' });
    await this.nameInput.fill(details.name);
    await this.countryInput.fill(details.country);
    await this.cityInput.fill(details.city);
    await this.cardInput.fill(details.creditCard);
    await this.monthInput.fill(details.month);
    await this.yearInput.fill(details.year);
  }

  async submitOrder() {
    await this.purchaseButton.click();
  }
}