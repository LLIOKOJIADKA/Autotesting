import { Locator, TestInfo, test as baseTest } from '@playwright/test';
import { LoginPage } from '../helpers/LoginPage';
import { RegisterPage } from '../helpers/RegisterPage';
import { ProfilePage } from '../helpers/ProfilePage';
import { ElementsPage } from '../helpers/ElementsPage';


const test = baseTest.extend<{
    loginPage: LoginPage;
    registerPage: RegisterPage;
    profilePage: ProfilePage;
    elementsPage: ElementsPage;
    testInfo: TestInfo;
    
}>({
    loginPage: async ({ page, context }, use) => {
        await use(new LoginPage(page, context));
    },

    registerPage: async ({page, context}, use) => {
       await use(new RegisterPage(page, context));
    },

    profilePage: async ({page, context}, use) => {
        await use(new ProfilePage(page, context));
    },

    elementsPage: async ({page, context}, use) => {
        await use(new ElementsPage(page, context));
    }
});

export default test;