import 'detox';

describe("Search Screen", () => {
    beforeAll(async () => {
        await device.launchApp();

        await waitFor(element(by.id('home-screen-view'))).toBeVisible().withTimeout(20000);
        await element(by.id('search-bar')).tap();
    })

    it('should type "000" and should show "No Search Data" message', async () => {
        const searchInput = element(by.id('search-input'));
        await searchInput.typeText('000');

        await expect(element(by.id('searched-item-list'))).toBeVisible();
        await expect(element(by.id('no-data'))).toHaveText('No Search Data');
        await searchInput.clearText();
    });

    it('should type "dal" and should display list of recipes and check touchability', async () => {
        const searchInput = element(by.id('search-input'));
        await searchInput.typeText('dal');

        await expect(element(by.id('searched-item-list'))).toBeVisible();
        await expect(element(by.id('recipe-0'))).toBeVisible();

        const recipe = element(by.id('recipe-name-0'));
        const recipeName = await recipe.getAttributes();

        await expect(recipe).toHaveText(recipeName.text);
        await device.pressBack();
        await element(by.id('recipe-0')).tap();
        await expect(element(by.id('recipe-name'))).toHaveText(recipeName.text);
        await device.pressBack();
        await device.pressBack();

        await waitFor(element(by.id('home-screen-view'))).toBeVisible().withTimeout(10000);
        await expect(element(by.id('app-name'))).toHaveText("Recipe Book");
    });
});