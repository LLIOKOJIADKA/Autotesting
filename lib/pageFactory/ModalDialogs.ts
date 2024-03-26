import {  BrowserContext, Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ModalDialogs extends BasePage {
    readonly page: Page;
    readonly context: BrowserContext;
    readonly SMALL_MODAL: Locator;
    readonly LARGE_MODAL: Locator;

    constructor(page: Page, context: BrowserContext) {
        super(page);
        this.context = context;
        this.page = page;
        this.SMALL_MODAL = page.getByRole('button', {name: 'Small modal'});
        this.LARGE_MODAL = page.getByRole('button', {name: 'Large modal'});
    }

    protected async getUrl(): Promise<string> {
        return '/modal-dialogs'
    }

    async openSmallModal() {    
        await this.SMALL_MODAL.click();
    }

    async isSmallModalCorrect() {
       expect(await this.page.getByText('Small Modal', { exact: true }).textContent()).toContain('Small Modal');
       await this.page.locator('#closeSmallModal').click()
    }
}