import 'detox';

describe("Home Screen", () => {
    beforeAll(async () => {
        await device.launchApp();

        await waitFor(element(by.id('home-screen-view'))).toBeVisible().withTimeout(20000);
    })

    it("should display header with title 'Recipe Book'", async () => {
        await expect(element(by.id('app-name'))).toBeVisible();
        await expect(element(by.id('app-name'))).toHaveText("Recipe Book");
    });

    it("should display search bar and check the touchability", async () => {
        const searchBar = element(by.id('search-bar'));
        await expect(searchBar).toBeVisible();
        await expect(element(by.id('search-input'))).toHaveText("Search Recipe...");
        await searchBar.tap();
        await device.pressBack();
        await device.pressBack();
    });

    it("should display the recipe list and scroll", async () => {
        const recipeList = element(by.id('recipe-list'));

        await waitFor(recipeList).toBeVisible().withTimeout(10000);
        await recipeList.scrollTo('bottom');
        await recipeList.scrollTo('top');
    });

    it("should display bottom tab and check the Home & Favorites tabs touchability", async () => {
        await expect(element(by.id('bottom-tabs'))).toBeVisible();

        const favTab = element(by.id('fav-button'));
        await favTab.tap();

        await expect(element(by.id('favorites-screen-view'))).toBeVisible();

        const homeTab = element(by.id('home-button'));
        await homeTab.tap();
    });
});