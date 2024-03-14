import { test as baseTest } from '@playwright/test';
import { RegisterPage } from '@lib/pageFactory/RegisterPage';
import { ProfilePage } from '@lib/pageFactory/ProfilePage';
import { ElementsPage } from '@lib/pageFactory/ElementsPage';
import { LoginPage } from '@lib/pageFactory/LoginPage';
import { WebTablesPage } from '@lib/pageFactory/WebTablesPage';


const test = baseTest.extend<{
    loginPage: LoginPage;
    registerPage: RegisterPage;
    profilePage: ProfilePage;
    elementsPage: ElementsPage;   
    webTablesPage: WebTablesPage; 
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
    },
    webTablesPage: async ({page, context}, use) => {
        await use(new WebTablesPage(page, context));
    }
});

export default test;