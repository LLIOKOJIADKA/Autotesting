import { Locator, Page } from "@playwright/test";

export class TableComponent {
    readonly page: Page;
    readonly ADD_BUTTON: Locator;
    ACTIONS: Array<Locator[]>;
    IS_TABLE_INITIATED: boolean;
    private TABLE: Array<Map<string, string>>;

    constructor(page: Page) {
        this.page = page;
        this.ADD_BUTTON = page.getByRole('button', {'name': 'Add'});
        this.IS_TABLE_INITIATED = false;
        this.TABLE = [];
        this.ACTIONS = [];
    }

    /**
     * Method for parsing table and storing values in this.TABLE field
     */
    async init() {
        let titles = await this.page.getByRole('columnheader').all();
        let content = await this.page.getByRole('rowgroup').all();
        let titlesNames: Array<string> = [];
        let tableValues: Array<Map<string, string>> = [];

        //change to for...in https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in
        for (let i = 0; i < titles.length; i++) {
            const title = await titles[i].textContent();
            titlesNames.push(title !== null ? title : '');
        }

        for(let j = 0; j < content.length; j++)
        {
            tableValues[j] = new Map();
            let splitedRowsData = (await content[j].innerText()).split('\n');

            for(let k = 0; k < splitedRowsData.length; k++){
                if(titlesNames[k] === 'Action')
                {
                    this.ACTIONS[j] = [content[j].getByTitle('Edit'), content[j].getByTitle('Delete')];
                    continue;
                }
                tableValues[j].set(titlesNames[k],splitedRowsData[k]);
            }
        }

        this.TABLE = tableValues;
        this.IS_TABLE_INITIATED = true;
    }

    /**
     * Returns table as it is or only filled rows.
     * @param filledRowsOnly true as default
     * @returns Array with rows
     */
    async getTable(filledRowsOnly: boolean = true ) {
        if(!this.IS_TABLE_INITIATED)
        {
            throw new Error('Table isn\'t init.'); 
        }

        if(filledRowsOnly)
        {
            let filledRows: Array<Map<string, string>> = [];
            for(let i = 0; i < this.TABLE.length; i++)
            {
                let row = await this.getRow(i);
                if(row.get('First Name')?.charCodeAt(0) === 160)
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
        if(!this.IS_TABLE_INITIATED)
        {
            throw new Error('Table isn\'t init.'); 
        }

        if(n > this.TABLE.length)
        {
            throw new Error('n value more than rows in the table'); 
        }
        return this.TABLE[n];
    }

    /**
     * Method for edition row by clicking on the row's icon
     * @param n row number to edit
     */
    async editRow(n:number) {
        if(!this.IS_TABLE_INITIATED)
        {
            throw new Error('Table isn\'t init.'); 
        }

        if(n > this.TABLE.length)
        {
            throw new Error('n value more than rows in the table'); 
        }
        await this.ACTIONS[n][0].click()
    }

    /**
     * Method for deletion row by clicking on the row's icon
     * @param n row number to delete
     */
    async deleteRow(n:number) {
        if(!this.IS_TABLE_INITIATED)
        {
            throw new Error('Table isn\'t init.'); 
        }

        if(n > this.TABLE.length)
        {
            throw new Error('n value more than rows in the table'); 
        }
        await this.ACTIONS[n][1].click()
    }

    //TODO
    async getValue(key: string) {
    }
}