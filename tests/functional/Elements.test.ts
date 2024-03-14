import test from 'lib/base/BaseTest';

test('Check elements', async({elementsPage}) =>
{
    await test.step('Check Text Box page', async() => {
        await elementsPage.openElementsPage();
        await elementsPage.openTextBox();
        await elementsPage.fillTextBox('Pavel');
        await elementsPage.submit();
        await elementsPage.checkSubmitedValues();
    });

    await test.step('Check Check Box page', async() => {
        await elementsPage.openCheckBox();
        await elementsPage.expand(200);
        await elementsPage.checkCheckBoxes();
        await elementsPage.verifySelectedCheckBoxes();
    })
});