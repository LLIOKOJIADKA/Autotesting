import { BrowserContext, Locator, Page, expect} from "@playwright/test";

export class LoginPage {
    readonly page: Page;
    readonly context: BrowserContext;
    readonly USERNAME_INPUT: Locator;
    readonly PASSWORD_INPUT: Locator;
    readonly LOGIN_BUTTON: Locator;
    readonly NEW_USER_BUTTON: Locator;
    readonly WELCOME_CONSENT_BUTTON: Locator;

    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;
        this.USERNAME_INPUT = page.getByPlaceholder('UserName');
        this.PASSWORD_INPUT = page.getByPlaceholder('Password');
        this.LOGIN_BUTTON = page.getByRole('button', {name: 'Login'});
        this.NEW_USER_BUTTON = page.getByRole('button', {name: 'New User'});
        this.WELCOME_CONSENT_BUTTON = page.getByLabel('Consent', { exact: true });
    }

    async openLoginPage(): Promise<void> {
        await this.page.goto("/login");
    }

    async isOpened() {
        await this.page.waitForLoadState();
        await expect(this.page).toHaveURL(/.*login/);
    }

    async register(): Promise<void> {
        await this.WELCOME_CONSENT_BUTTON.click();
        await this.NEW_USER_BUTTON.click();
    }

    async login(username: string, password: string) {
        await this.USERNAME_INPUT.fill(username);
        await this.PASSWORD_INPUT.fill(password);
        await this.LOGIN_BUTTON.click();
    }
}