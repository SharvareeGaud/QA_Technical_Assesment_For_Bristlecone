import { Page, Dialog } from '@playwright/test';

export class BasePage {
  constructor(protected page: Page) {}

  async navigate(path: string = '/') {
    await this.page.goto(path);
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Listens for a one-off browser dialog (alert/confirm), verifies message, and accepts it.
   */
  async handleNextDialog(): Promise<string> {
    return new Promise<string>((resolve) => {
      this.page.once('dialog', async (dialog: Dialog) => {
        const message = dialog.message();
        await dialog.accept();
        resolve(message);
      });
    });
  }
}