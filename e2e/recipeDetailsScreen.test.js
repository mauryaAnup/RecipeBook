import 'detox';

describe("Recipe Details", () => {
    beforeAll(async () => {
        await device.launchApp();

        await waitFor(element(by.id('home-screen-view'))).toBeVisible().withTimeout(20000);
    });

    it("should open any recipe from the list on home screen when pressed", async () => {
        const recipeList = element(by.id('recipe-list'));
        await expect(recipeList).toBeVisible();

        const recipe = element(by.id('item-0'));
        const recipeName = await element(by.id('recipe-name-0')).getAttributes().then((res) => { return res.text });

        await recipe.tap();
        await expect(element(by.id('recipe-name'))).toHaveText(recipeName);
    });

    it("should render all the component (Recipe Image, Name, Fav icon, Ingredients, Directions)", async () => {
        await expect(element(by.id('recipe-image'))).toBeVisible();
        await expect(element(by.id('add-to-fav'))).toBeVisible();
        await expect(element(by.id('liked-image'))).not.toBeVisible();
        await expect(element(by.id('not-liked-image'))).toBeVisible();
        await expect(element(by.id('ingredients'))).toBeVisible();
        await expect(element(by.id('directions'))).toBeVisible();
    });

    it("should scroll the ingredients list and direction list", async () => {
        const ingredientsList = element(by.id('ingredients-list'));
        const directionsList = element(by.id('directions-list'));

        await ingredientsList.scrollTo('bottom');
        await ingredientsList.scrollTo('top');

        await element(by.id('directions')).tap();
        await directionsList.scrollTo('bottom');
        await directionsList.scrollTo('top');

        await element(by.id('ingredients')).tap();
    });

    it("should change the Like icon when clicked and home screen should show like icon for that recipe", async () => {
        await element(by.id('add-to-fav')).tap();
        await expect(element(by.id('liked-image'))).toBeVisible();

        await device.pressBack();

        await waitFor(element(by.id('recipe-list'))).toBeVisible().withTimeout(10000);
        await expect(element(by.id('fav-marked-0'))).toBeVisible();
        await expect(element(by.id('fav-marked-1'))).not.toBeVisible();
    });

    it("should change the Like icon when clicked again and home screen should not show like icon for that recipe", async () => {
        await element(by.id('item-0')).tap();
        await element(by.id('add-to-fav')).tap();
        await expect(element(by.id('liked-image'))).not.toBeVisible();
        await expect(element(by.id('not-liked-image'))).toBeVisible();

        await device.pressBack();

        await waitFor(element(by.id('recipe-list'))).toBeVisible().withTimeout(10000);
        await expect(element(by.id('fav-marked-0'))).not.toBeVisible();
        await expect(element(by.id('fav-marked-1'))).not.toBeVisible();
    });
});