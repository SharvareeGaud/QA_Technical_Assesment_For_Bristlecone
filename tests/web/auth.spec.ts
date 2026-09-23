import { test, expect } from '@playwright/test';
import { AuthModel } from '../../pages/components/AuthModel';
import { BasePage } from '../../pages/BasePage';

test.describe('Authentication Scenarios', () => {
  let authModel: AuthModel;
  let basePage: BasePage;

  test.beforeEach(async ({ page }) => {
    authModel = new AuthModel(page);
    basePage = new BasePage(page);
    await basePage.navigate();
  });

  test('Positive: should register a new user successfully', async () => {
    const randomUser = `test_user_${Date.now()}`;
    const message = await authModel.signUp(randomUser, 'Password123!');
    expect(message).toBe('Sign up successful.');
  });

  test('Negative: should reject login with invalid password', async () => {
    const message = await authModel.loginExpectingError('existing_user_demo', 'wrong_pass');
    expect(message).toBe('Wrong password.');
  });
});