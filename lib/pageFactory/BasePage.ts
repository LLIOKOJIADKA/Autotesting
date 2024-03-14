import { Page, expect } from "@playwright/test";

export abstract class BasePage {
    readonly page: Page;
    

    constructor(page: Page){
        this.page = page;
    }

    async open() {
        await this.page.goto(await this.getUrl());
        //await this.page.goto('/webtables');
    }

    async isOpened() {
        await this.page.waitForLoadState('domcontentloaded', {timeout: 1000});
        await expect(this.page).toHaveURL(await this.getUrl());
    }

    protected abstract getUrl(): Promise<string>;
}