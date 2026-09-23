import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  readonly phoneCategory: Locator = this.page.locator("a:text('Phones')");
  readonly laptopCategory: Locator = this.page.locator("a:text('Laptops')");
  readonly monitorCategory: Locator = this.page.locator("a:text('Monitors')");
  readonly productCards: Locator = this.page.locator('.card');
  readonly navCart: Locator = this.page.locator('#cartur');
  readonly addToCartButton: Locator = this.page.locator("a:text('Add to cart')");

  constructor(page: Page) {
    super(page);
  }

  async selectCategory(category: 'Phones' | 'Laptops' | 'Monitors') {
    await this.page.locator(`a:text('${category}')`).click();
    // Wait for the dynamic catalog to re-render cards
    await this.page.waitForResponse((res) => res.url().includes('bycat') && res.status() === 200);
  }

  async selectProduct(productTitle: string) {
    await this.page.locator(`a:text('${productTitle}')`).first().click();
    await this.addToCartButton.waitFor({ state: 'visible' });
  }

  async addCurrentProductToCart(): Promise<string> {
    const dialogPromise = this.handleNextDialog();
    await this.addToCartButton.click();
    return await dialogPromise;
  }

  async goToCart() {
    await this.navCart.click();
    await this.page.waitForURL('**/cart.html');
  }
}