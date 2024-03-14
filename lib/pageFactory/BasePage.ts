import { Page, expect } from "@playwright/test";

export abstract class BasePage {
    readonly page: Page;
    

    constructor(page: Page){
        this.page = page;
    }

    /**
     * Method of the abstract class for opening the pages.
     */
    async open() {
        await this.page.goto(await this.getUrl());

        let cookiePopup = this.page.getByLabel('Consent', { exact: true });
        try {
            if(await cookiePopup.isEnabled({timeout: 1000})){
                cookiePopup.click();
            }
        } 
        catch (error) {
            console.log('LoginPage locator.isEnabled: Timeout exceeded.');
        }
    }

    /**
     * Method of the abstract class for checking that page is opened
     */
    async isOpened() {
        await this.page.waitForLoadState('domcontentloaded', {timeout: 1000});
        await expect(this.page).toHaveURL(await this.getUrl());
    }

    /**
     * Abstract function for handling URL in the pages classes
     */
    protected abstract getUrl(): Promise<string>;
}