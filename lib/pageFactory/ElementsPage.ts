import { BrowserContext, Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";


export class ElementsPage extends BasePage {
    readonly page: Page;
    readonly context: BrowserContext;
    readonly TEXT_BOX_MENU: Locator;
    readonly CHECK_BOX_MENU: Locator;
    readonly WEB_TABLES_MENU: Locator;
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
    name: string | undefined;
    

    constructor(page: Page, context: BrowserContext) {
        super(page);
        this.page = page;
        this.context = context;
        this.TEXT_BOX_MENU = page.getByText('Text Box');
        this.CHECK_BOX_MENU = page.getByText('Check Box');
        this.WEB_TABLES_MENU = page.getByText('Web Tables');
        this.TEXT_BOX_FULL_NAME = page.getByPlaceholder('Full Name');
        this.SUBMIT_BUTTON = page.getByRole('button', {name: 'Submit'});
        this.FULL_NAME_LABLE = page.getByText(/^Name:*/);
        this.EXPAND_TOGGLE = page.getByLabel('Toggle').first();
        this.WELCOME_CONSENT_BUTTON = page.getByLabel('Consent', { exact: true });
        this.FOLDERS = page.locator('li').filter({ hasText: /^((?!Home).)*$/ }).getByLabel('Toggle');
        this.REACT = page.getByText('React');
        this.OFFICE = page.getByText('Office');
        this.NOTES = page.getByText('Notes');
        this.YOU_HAVE_SELECTED = page.locator('#result');
    }

    /**
     * Method for opening the Text box tab in Element page.
     */
    async openTextBox() {
        await this.TEXT_BOX_MENU.click();
        await this.page.waitForLoadState('domcontentloaded', {timeout: 1000});
        await expect(this.page).toHaveURL(/.*text-box/);
    }

    /**
     * Method for filling 'Name' input in the Text box tab with provided value.
     * @param name string with the name
     */
    async fillTextBox(name: string) {
        await this.TEXT_BOX_FULL_NAME.fill(name);
        this.name = name;
    }

    /**
     * Method for submitting the text in the Text Box tab.
     */
    async submit() {
        await this.SUBMIT_BUTTON.click();
    }

    /**
     * Check values in the Text box tab.
     */
    async checkSubmitedValues() {
        await expect(this.FULL_NAME_LABLE).toContainText('Name:' + this.name);
    }

    /**
     * Method for opening Element page using URL.
     * NOTE: here cookies also will be handled
     */
    async openElementsPage() {
        await this.page.goto('/elements');

        try {
            if(await this.WELCOME_CONSENT_BUTTON.isEnabled({timeout: 1000})){
                this.WELCOME_CONSENT_BUTTON.click();
            }
        } 
        catch (error) {
            console.log('ElementsPage locator.isEnabled: Timeout exceeded.');
        }
    }

    /**
     * Method for opening Check box tab
     */
    async openCheckBox() {
        await this.CHECK_BOX_MENU.click();
    }

    /**
     * Method will expand one by one 3 elements in the Check box tab.
     * For every element delay will be timer * (index +1)
     * @param timer in ms
     */
    async expand(timer: number) {
        await this.EXPAND_TOGGLE.click();

        const foldersList = await this.FOLDERS.all();
        for (let index = 0; index < foldersList.length; index++) {
            await foldersList[index].click({delay: timer * (index + 1)});
        }
    }

    /**
     * Method for checking NOTES, REACT, and OFFICE check boxes in the Check box tab
     */
    async checkCheckBoxes() {
        await this.NOTES.click();
        await this.REACT.click();
        await this.OFFICE.click();
    }

    /**
     * Method for verifying selected in .checkCheckBoxes() method checkboxes in the Check box tab. 
     */
    async verifySelectedCheckBoxes() {
        await expect(this.YOU_HAVE_SELECTED).toHaveText('You have selected :notesreactofficepublicprivateclassifiedgeneral');
    }

    async openWebTables() {
        await this.WEB_TABLES_MENU.click()
    }

    protected async getUrl(): Promise<string> {
        return '/elements';
    }
}