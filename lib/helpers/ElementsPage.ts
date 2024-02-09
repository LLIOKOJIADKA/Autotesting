import { BrowserContext, Locator, Page, expect } from "@playwright/test";


export class ElementsPage {
    readonly page: Page;
    readonly context: BrowserContext;
    readonly TEXT_BOX_MENU: Locator;
    readonly CHECK_BOX_MENU: Locator;
    readonly TEXT_BOX_FULL_NAME: Locator;
    readonly SUBMIT_BUTTON: Locator;
    readonly FULL_NAME_LABLE: Locator;
    readonly EXPAND_TOGGLE: Locator;
    readonly WELCOME_CONSENT_BUTTON: Locator;
    readonly FOLDERS: Locator;
    readonly NOTES: Locator;
    readonly OFFICE: Locator;
    readonly REACT: Locator;
    readonly YOU_HAVE_SELECTED: Locator;
    name: string;
    

    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;
        this.TEXT_BOX_MENU = page.getByText('Text Box');
        this.CHECK_BOX_MENU = page.getByText('Check Box');
        this.TEXT_BOX_FULL_NAME = page.getByPlaceholder('Full Name');
        this.SUBMIT_BUTTON = page.getByRole('button', {name: 'Submit'});
        this.FULL_NAME_LABLE = page.getByText(/^Name:*/);
        this.EXPAND_TOGGLE = page.getByLabel('Toggle').first();
        this.WELCOME_CONSENT_BUTTON = page.getByLabel('Consent', { exact: true });
        this.FOLDERS = page.locator('li').filter({ hasText: /^((?!Home).)*$/ }).getByLabel('Toggle');
        this.REACT = page.getByText('React');
        this.OFFICE = page.getByText('Office');
        this.NOTES = page.getByText('Notes');
        this.YOU_HAVE_SELECTED = page.getByText(/^You have selected :*/);
    }

    async openTextBox() {
        await this.TEXT_BOX_MENU.click();
        await this.page.waitForLoadState('domcontentloaded', {timeout: 1000});
        await expect(this.page).toHaveURL(/.*text-box/);
    }

    async fillTextBox(name: string) {
        await this.TEXT_BOX_FULL_NAME.fill(name);
        this.name = name;
    }

    async submit() {
        await this.SUBMIT_BUTTON.click();
    }

    async checkSubmitedValues() {
        await expect(this.FULL_NAME_LABLE).toContainText('Name:' + this.name);
    }

    async openElementsPage() {
        await this.page.goto('/elements');
        if(await this.WELCOME_CONSENT_BUTTON.isEnabled({timeout: 1000})){
            this.WELCOME_CONSENT_BUTTON.click();
        }
    }

    async openCheckBox() {
        await this.CHECK_BOX_MENU.click();
    }

    async expand() {
        await this.EXPAND_TOGGLE.click();

        const foldersList = await this.FOLDERS.all();
        let c = 1000;
        for (let index = 0; index < foldersList.length; index++) {
            await foldersList[index].click({delay: c * (index + 1)});
        }
    }

    async checkCheckBoxes() {
        await this.NOTES.click();
        await this.REACT.click();
        await this.OFFICE.click();
    }

    async compateSelectedCheckBoxes() {
        await expect(this.YOU_HAVE_SELECTED).toContainText('You have selected : notes react office public classified general');
    }
}   