import { Locator, Page } from "@playwright/test";

export class TableComponent {
    readonly page: Page;
    readonly ADD_BUTTON: Locator;
    IS_TABLE_INITED: boolean;
    private TABLE: Array<Map<string, string>>;

    constructor(page: Page) {
        this.page = page;
        this.ADD_BUTTON = page.getByRole('button', {'name': 'Add'});
        this.IS_TABLE_INITED = false;
        this.TABLE = [];
    }

    /**
     * Method for parsing table and storing values in this.TABLE field
     */
    async parseTableValues() {
        let titles = await this.page.getByRole('columnheader').all();
        let content = await this.page.getByRole('rowgroup').all();
        let titlesNames: Array<string> = [];
        let tableValues: Array<Map<string, string>> = [];

        for (let i = 0; i < titles.length; i++) {
            const title = await titles[i].textContent();
            titlesNames.push(title !== null ? title : '');
        }

        for(let j = 0; j < content.length; j++)
        {
            tableValues[j] = new Map();
            let splitedRowsData = (await content[j].innerText()).split('\n');

            for(let k = 0; k < splitedRowsData.length; k++){
                tableValues[j].set(titlesNames[k],splitedRowsData[k]);
            }
        }

        this.TABLE = tableValues;
        this.IS_TABLE_INITED = true;
    }

    /**
     * Returns table as it is or only filled rows.
     * @param filledRowsOnly true as default
     * @returns 
     */
    async getTable(filledRowsOnly: boolean = true ) {
        if(filledRowsOnly)
        {
            let filledRows: Array<Map<string, string>> = [];
            for(let i = 0; i < this.TABLE.length; i++)
            {
                let row = await this.getRow(i);
                if(row.get('First Name') === null)
                {
                    continue;
                }
                else
                {
                    filledRows.push(row);
                }
            }

            return filledRows;

        }
        else
        {
            return this.TABLE;
        }
    }
    
    /**
     * Method for getting specified row from the table
     * @param n row number
     * @returns row
     */
    async getRow(n: number) {
        return this.TABLE[n];
    }

    //TODO
    async getValue(key: string) {
    }
}