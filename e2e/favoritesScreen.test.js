import "detox";

describe("Favorites Screen", () => {
    beforeAll(async () => {
        await device.launchApp();

        await waitFor(element(by.id('home-screen-view'))).toBeVisible().withTimeout(20000);
    });

    it("Favorites screen should be empty when app first imstalled and display 'No Favorites' message", async () => {
        await element(by.id('fav-button')).tap();
        await expect(element(by.id('favorites-screen-view'))).toBeVisible();
        await expect(element(by.id('fav-list'))).toBeVisible();
        await expect(element(by.id('empty-fav-image'))).toBeVisible();
        await expect(element(by.id('no-fav-text'))).toHaveText("No Favorites");
    });

    it("should add recipe to favorites from recipe details screen when like button is pressed", async () => {
        await element(by.id('home-button')).tap();
        await waitFor(element(by.id('recipe-list'))).toBeVisible().withTimeout(10000);

        await element(by.id('item-0')).tap();
        await element(by.id('add-to-fav')).tap();
        await device.pressBack();

        await element(by.id('fav-button')).tap();

        await expect(element(by.id('fav-list'))).toBeVisible();
        await expect(element(by.id('fav-item-0'))).toBeVisible();
        await expect(element(by.id('fav-like-image-0'))).toBeVisible();
    });

    it("should remove recipe from favorites when like button is pressed from recipe details screen", async () => {
        await element(by.id('fav-item-0')).tap();
        await element(by.id('add-to-fav')).tap();

        await device.pressBack();

        await expect(element(by.id('empty-fav-image'))).toBeVisible();
        await expect(element(by.id('no-fav-text'))).toHaveText("No Favorites");
    });

    it("should add recipe to favorites from search screen", async () => {
        await element(by.id('home-button')).tap();
        await element(by.id('search-bar')).tap();

        await element(by.id('search-input')).typeText('Mat');
        await device.pressBack();
        await element(by.id('recipe-0')).tap();
        await element(by.id('add-to-fav')).tap();

        await device.pressBack();
        await device.pressBack();

        await waitFor(element(by.id('recipe-list'))).toBeVisible().withTimeout(10000);
        await element(by.id('fav-button')).tap();

        await expect(element(by.id('fav-list'))).toBeVisible();
        await expect(element(by.id('fav-item-0'))).toBeVisible();
        await expect(element(by.id('fav-like-image-0'))).toBeVisible();
    });

    it("favorites recipe should be persistent when app is killed or reloaded", async () => {
        await device.reloadReactNative();
        await waitFor(element(by.id('home-screen-view'))).toBeVisible().withTimeout(20000);
        await element(by.id('fav-button')).tap();

        await expect(element(by.id('fav-list'))).toBeVisible();
        await expect(element(by.id('fav-item-0'))).toBeVisible();
        await expect(element(by.id('fav-like-image-0'))).toBeVisible();
    });

    it("favorites recipe should remove when clicked on like icon from the favorites tab itself", async () => {
        await element(by.id('remove-fav-0')).tap();
        await expect(element(by.id('fav-list'))).toBeVisible();
        await expect(element(by.id('empty-fav-image'))).toBeVisible();
        await expect(element(by.id('no-fav-text'))).toHaveText('No Favorites');
    });
})