import { BrowserContext, Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import { TableComponent } from "@lib/componentsFactory/TableComponent";

export class WebTablesPage extends BasePage {
    readonly page: Page;
    readonly context: BrowserContext;
    readonly WEBTABLE_COMPONENT: TableComponent;
    readonly WELCOME_CONSENT_BUTTON: Locator;

    constructor(page: Page, context: BrowserContext) {
        super(page);
        this.page = page;
        this.context = context;
        this.WEBTABLE_COMPONENT = new TableComponent(page);
        this.WELCOME_CONSENT_BUTTON = page.getByLabel('Consent', { exact: true });
    }

    async openWebTablesPage() {
        await this.page.goto('/webtables');
        try {
            if(await this.WELCOME_CONSENT_BUTTON.isEnabled({timeout: 1000})){
                this.WELCOME_CONSENT_BUTTON.click();
            }
        } 
        catch (error) {
            console.log('LoginPage locator.isEnabled: Timeout exceeded.');
        }
    }

    async initTable() {
       await this.WEBTABLE_COMPONENT.parseTableValues();
    }

    async isTableCorrect(): Promise<boolean>{

        //not good idea, need to be done in every method which works with table
        if(!this.WEBTABLE_COMPONENT.IS_TABLE_INITED)
        {
            this.WEBTABLE_COMPONENT.parseTableValues();
        }

        const table = await this.WEBTABLE_COMPONENT.getTable();
        
        if(table.length === 3 && table[0].get('First Name') === 'Cierra')
        {
            return true;
        }

        return false;
    }

    protected async getUrl(): Promise<string>
    {
        return '/webtables';
    }
}