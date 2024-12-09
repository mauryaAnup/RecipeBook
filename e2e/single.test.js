import 'detox';

describe("Splash Screen", () => {
    beforeAll(async () => {
        await device.launchApp();
    })

    it('App should open and display Splash Screen and navigate to Home Screen', async () => {
        await expect(element(by.id('splash-screen-view'))).toBeVisible();
        await expect(element(by.id('splash-animation'))).toBeVisible();
        await expect(element(by.id('app-name'))).toHaveText('Recipe App');

        await waitFor(element(by.id('home-screen-view'))).toBeVisible().withTimeout(20000);
    })
});

describe("Home Screen", () => {
    it("should display header with title 'Recipe Book'", async () => {
        await expect(element(by.id('app-name'))).toBeVisible();
        await expect(element(by.id('app-name'))).toHaveText("Recipe Book");
    });

    it("should display the recipe list and perform scroll", async () => {
        const recipeList = element(by.id('list-scroll'));

        await expect(recipeList).toBeVisible();
        await recipeList.scrollTo('bottom');
        await recipeList.scrollTo('top');
    });

    it("should display search bar and check the touchability", async () => {
        const searchBar = element(by.id('search-bar'));
        await expect(searchBar).toBeVisible();
        await expect(element(by.id('search-input'))).toHaveText("Search Recipe...");
        await searchBar.tap();
        await device.pressBack();
        await device.pressBack();
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

describe("Search Screen", () => {
    beforeAll(async () => {
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
    });
});

describe("Recipe Details", () => {
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

describe("Favorites Screen", () => {
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
});