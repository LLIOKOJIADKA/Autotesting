import { BrowserContext, Locator, Page, expect } from "@playwright/test";
import { solve } from "recaptcha-solver";

export class RegisterPage {
    readonly page: Page;
    readonly context: BrowserContext;
    readonly FIRST_NAME_INPUT: Locator;
    readonly LAST_NAME_INPUT: Locator;
    readonly USERNAME_INPUT: Locator;
    readonly PASSWORD_INPUT: Locator;
    readonly CAPTCHA_CHECKBOX: Locator;
    readonly REGISTER_BUTTON: Locator;
    readonly BACK_TO_LOGIN: Locator;
    username: string;
    password: string;

    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;
        this.FIRST_NAME_INPUT = page.getByPlaceholder('First Name');
        this.LAST_NAME_INPUT = page.getByPlaceholder('Last Name');
        this.USERNAME_INPUT = page.getByPlaceholder('UserName');
        this.PASSWORD_INPUT = page.getByPlaceholder('Password');
        this.CAPTCHA_CHECKBOX = page.frameLocator('iframe[title="reCAPTCHA"]').getByLabel('I\'m not a robot');
        this.REGISTER_BUTTON = page.getByRole('button', {name: 'Register'});
        this.BACK_TO_LOGIN = page.getByRole('button', {name: 'Back to Login'})
        this.username = 'user' + Date.now();
        this.password = 'the_most_secure_passworD!4';
    }

    async createNewUser() {
        await this.FIRST_NAME_INPUT.fill('Marko');
        await this.LAST_NAME_INPUT.fill('Polo');
        await this.USERNAME_INPUT.fill(this.username);
        await this.PASSWORD_INPUT.fill(this.password);
        await this.page.mouse.wheel(0, 150);
        await this.CAPTCHA_CHECKBOX.click();
        await solve(this.page);
        await this.REGISTER_BUTTON.click();
    }

    async isOpened() {
        await this.page.waitForLoadState();
        await expect(this.page).toHaveURL(/.*register/);
    }

    async returnToLoginPage() {
        await this.BACK_TO_LOGIN.click();
    }
}