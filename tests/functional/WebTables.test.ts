import test from '@lib/base/BaseTest';
import { expect } from '@playwright/test';

test('Check web component', async ({webTablesPage, elementsPage}) => 
{
    await test.step('Navigate to WebTables page', async() => {
        await webTablesPage.open();
        expect(await webTablesPage.isTableCorrect()).toBeTruthy();
    })
})