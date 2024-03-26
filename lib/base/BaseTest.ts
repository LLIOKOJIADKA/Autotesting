import { test as baseTest } from '@playwright/test';
import { RegisterPage } from '@lib/pageFactory/RegisterPage';
import { ProfilePage } from '@lib/pageFactory/ProfilePage';
import { ElementsPage } from '@lib/pageFactory/ElementsPage';
import { LoginPage } from '@lib/pageFactory/LoginPage';
import { WebTablesPage } from '@lib/pageFactory/WebTablesPage';
import { ModalDialogs } from '@lib/pageFactory/ModalDialogs';


const test = baseTest.extend<{
    loginPage: LoginPage;
    registerPage: RegisterPage;
    profilePage: ProfilePage;
    elementsPage: ElementsPage;   
    webTablesPage: WebTablesPage;
    modalDialogs: ModalDialogs;
}>({
    loginPage: async ({ page, context }, use) => {
        await use(new LoginPage(page, context));
        await context.close();
        await page.close();
    },

    registerPage: async ({page, context}, use) => {
       await use(new RegisterPage(page, context));
       await context.close();
       await page.close();
    },

    profilePage: async ({page, context}, use) => {
        await use(new ProfilePage(page, context));
        await context.close();
        await page.close();
    },

    elementsPage: async ({page, context}, use) => {
        await use(new ElementsPage(page, context));
        await context.close();
        await page.close();
    },

    webTablesPage: async ({page, context}, use) => {
        await use(new WebTablesPage(page, context));
        await context.close();
        await page.close();
    },

    modalDialogs: async ({page, context}, use) => {
        await use(new ModalDialogs(page, context));
        await context.close();
        await page.close();
    }
});

export default test;