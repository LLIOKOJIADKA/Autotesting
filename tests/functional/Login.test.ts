import { expect } from '@playwright/test';
import test from '@lib/base/BaseTest';

test('Login as a new user', async ({loginPage, registerPage, profilePage}) => 
{
   await test.step('Navigate to Login page', async() => 
   {
      await loginPage.openLoginPage();
      expect(loginPage.isOpened()).toBeTruthy();
   });

   await test.step('Create new User', async() => 
   {
      expect(loginPage.isOpened()).toBeTruthy();
      await loginPage.register();
      expect(registerPage.isOpened()).toBeTruthy();
      await registerPage.createNewUser();
      await registerPage.returnToLoginPage();
      expect(loginPage.isOpened()).toBeTruthy();
      await loginPage.login(registerPage.username, registerPage.password);
      expect(profilePage.isOpened()).toBeTruthy();
   });
});