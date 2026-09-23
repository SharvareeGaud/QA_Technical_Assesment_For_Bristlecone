import { Page, Locator } from '@playwright/test';
import { BasePage } from '../BasePage';

export class AuthModel extends BasePage {
  // Navigation Bar Links
  readonly navSignUp: Locator = this.page.locator('#signin2');
  readonly navLogin: Locator = this.page.locator('#login2');
  readonly navLogout: Locator = this.page.locator('#logout2');
  readonly userGreeting: Locator = this.page.locator('#nameofuser');

  // Sign-Up Modal Elements
  readonly signUpModal: Locator = this.page.locator('#signInModal');
  readonly signUpUsernameInput: Locator = this.page.locator('#sign-username');
  readonly signUpPasswordInput: Locator = this.page.locator('#sign-password');
  readonly signUpSubmitButton: Locator = this.page.locator('button[onclick="register()"]');

  // Log-In Modal Elements
  readonly loginModal: Locator = this.page.locator('#logInModal');
  readonly loginUsernameInput: Locator = this.page.locator('#loginusername');
  readonly loginPasswordInput: Locator = this.page.locator('#loginpassword');
  readonly loginSubmitButton: Locator = this.page.locator('button[onclick="logIn()"]');

  constructor(page: Page) {
    super(page);
  }

  async signUp(username: string, password: string): Promise<string> {
    await this.navSignUp.click();
    await this.signUpModal.waitFor({ state: 'visible' });
    await this.signUpUsernameInput.fill(username);
    await this.signUpPasswordInput.fill(password);

    const dialogPromise = this.handleNextDialog();
    await this.signUpSubmitButton.click();
    return await dialogPromise;
  }

  async login(username: string, password: string) {
    await this.navLogin.click();
    await this.loginModal.waitFor({ state: 'visible' });
    await this.loginUsernameInput.fill(username);
    await this.loginPasswordInput.fill(password);
    await this.loginSubmitButton.click();
  }

  async loginExpectingError(username: string, password: string): Promise<string> {
    await this.navLogin.click();
    await this.loginModal.waitFor({ state: 'visible' });
    await this.loginUsernameInput.fill(username);
    await this.loginPasswordInput.fill(password);

    const dialogPromise = this.handleNextDialog();
    await this.loginSubmitButton.click();
    return await dialogPromise;
  }
}