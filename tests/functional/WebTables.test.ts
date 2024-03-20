import test from '@lib/base/BaseTest';
import { expect } from '@playwright/test';

test('Check web component', async ({webTablesPage, elementsPage}) => 
{
    await test.step('Navigate to WebTables page', async() => {
        await webTablesPage.open();
        await webTablesPage.WEBTABLE_COMPONENT.init();
        expect(await webTablesPage.isTableCorrect()).toBeTruthy();
        await webTablesPage.WEBTABLE_COMPONENT.deleteRow(1);
        await webTablesPage.WEBTABLE_COMPONENT.editRow(1);
    })
})