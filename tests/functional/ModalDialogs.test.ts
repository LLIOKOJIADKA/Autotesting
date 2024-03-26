import test from '@lib/base/BaseTest';

test('Check small popup window', async({modalDialogs}) => 
{
    await test.step('Open popup', async() => 
    {
        await modalDialogs.open();
        await modalDialogs.openSmallModal();
        await modalDialogs.isSmallModalCorrect();
    })
});