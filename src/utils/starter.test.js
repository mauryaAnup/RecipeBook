import "detox";

const splashScreenCheck = async () => {
    await expect(element(by.id('app-name'))).toBeVisible();
}

const homeScreenCheck = async () => {
    await waitFor(element(by.id('home-main-view'))).toBeVisible().withTimeout(10000);
}

const homeScreenComponentCheck = async () => {
    // header check
    await splashScreenCheck();

    // search bar check
    await expect(element(by.id('search-bar'))).toBeVisible();
    await expect(element(by.text('Search Recipe...'))).toBeVisible();

    // recipe list check
    await expect(element(by.id('recipe-list'))).toBeVisible();
    await expect(element(by.id('item-0'))).toBeVisible();

    // bottom tabs check
    await expect(element(by.id('bottom-tabs'))).toBeVisible();
    await expect(element(by.id('home-button'))).toBeVisible();
    await expect(element(by.id('fav-button'))).toBeVisible();
}

const homeScreenRecipeListCheck = async () => {
    let recipeList = element(by.id('recipe-list'));
    let scrollList = element(by.id('list-scroll'));

    // Verifying the recipe list
    await expect(recipeList).toBeVisible();

    // Checking scroll working
    await scrollList.scrollTo('bottom');
    await scrollList.scrollTo('top');

    let item = element(by.id('item-0'));
    await expect(item).toBeVisible();
    await item.tap();

    await recipeDetailsCheck();
}

const recipeDetailsCheck = async () => {
    const addToFav = element(by.id('add-to-fav'));
    const likedImage = element(by.id('liked-image'));
    const notLikedImage = element(by.id('not-liked-image'));
    const ingredients = element(by.id('ingredients'));
    const directions = element(by.id('directions'));
    const ingredientsList = element(by.id('ingredients-list'));
    const directionsList = element(by.id('directions-list'));

    let item = element(by.id('item-0'));
    await waitFor(item).toBeVisible().withTimeout(20000);
    await item.tap();

    await expect(element(by.id('recipe-main-view'))).toBeVisible();
    await expect(element(by.id('recipe-image'))).toBeVisible();
    await expect(element(by.id('recipe-name'))).toBeVisible();
    await expect(notLikedImage).toBeVisible();
    await expect(likedImage).not.toBeVisible();
    await expect(ingredients).toBeVisible();
    await expect(directions).toBeVisible();
    await expect(ingredientsList).toBeVisible();
    await expect(directionsList).not.toBeVisible();

    await addToFav.tap();
    await expect(likedImage).toBeVisible();

    await directions.tap();
    await expect(directionsList).toBeVisible();

    await ingredients.tap();
    await ingredientsList.scrollTo("bottom");
    await ingredientsList.scrollTo("top");

    await directions.tap();
    await directionsList.scrollTo('bottom');

    await addToFav.tap();
    await expect(notLikedImage).toBeVisible();

    await device.pressBack();


}

const searchRecipeCheck = async () => {
    let searchBar = element(by.id('search-bar'));
    let searchInput = element(by.id('search-input'));
    let searchedList = element(by.id('searched-item-list'));

    // checking search element present on home screen or not and pressing it.
    await expect(searchBar).toBeVisible();
    await searchBar.tap();

    // checking whether the search screen has its all required components or not.
    await expect(element(by.id('back-button'))).toBeVisible();
    await expect(element(by.id('no-data'))).toBeVisible();

    // checking keyboard is open by default when navigated to search screen
    await expect(searchInput).toBeFocused();
    await device.pressBack(); // closed keyboard;

    // entering the wrong recipe name in textinput 
    await searchInput.typeText("000");
    await expect(element(by.id('no-data'))).toBeVisible();
    await device.pressBack(); // closed keyboard;

    // entering the recipe name in textinput
    await searchInput.clearText();

    await searchInput.typeText("d");
    await device.pressBack();
    await expect(searchedList).toBeVisible();
    await expect(element(by.id('recipe-0'))).toBeVisible();

    await searchedList.scrollTo('bottom');
    await searchedList.scrollTo('top');

    await searchInput.typeText("al");
    await expect(searchedList).toBeVisible();
    await expect(element(by.id('recipe-0'))).toBeVisible();

    const recipeName = await element(by.id('recipe-name-0')).getAttributes();

    await expect(element(by.id('recipe-name-0'))).toHaveText(recipeName.text)
    await expect(element(by.text(`${recipeName.text}`))).toBeVisible();

    // await device.pressBack(); // closed keyboard;

    // await device.pressBack();

}

describe('Example', () => {
    beforeAll(async () => {
        await device.launchApp();
    });

    // it('should have Splash screen', splashScreenCheck);

    // it('should have Home screen', homeScreenCheck);
    // 
    // test('should have all Home screen components (i.e header, search bar, recipe list, bottom tabs)', homeScreenComponentCheck);

    // it('should check the recipe list functionality', homeScreenRecipeListCheck);
    it('should check the recipe list functionality', recipeDetailsCheck);

    // it('should perform search functionality properly', searchRecipeCheck);




    // it('should show the Bottom Tabs', async () => {
    //   await waitFor(element(by.id('bottom-tabs'))).toBeVisible().withTimeout(10000);
    //   await expect(element(by.id('home-button'))).toExist();
    //   await expect(element(by.id('fav-button'))).toExist();
    // });

    // it('should scroll the recipe till end on home page', async () => {
    //   await waitFor(element(by.text('Eton Mess')))
    //     .toBeVisible()
    //     .whileElement(by.id('list-scroll'))
    //     .scroll(10000, 'down');

    //   await element(by.id('list-scroll')).scrollTo('top');
    //   let item = element(by.id('item-0'));
    //   await expect(item).toBeVisible();
    //   await item.tap();

    //   await expect(element(by.id("recipe-main-view"))).toBeVisible();
    //   await expect(element(by.id('recipe-image'))).toBeVisible();
    //   await expect(element(by.id('not-liked-image'))).toBeVisible();

    //   let favBtn = element(by.id('add-to-fav'));
    //   await favBtn.tap();
    //   await expect(element(by.id('liked-image'))).toBeVisible();

    //   await device.pressBack();

    //   await waitFor(element(by.id('bottom-tabs'))).toBeVisible().withTimeout(10000);
    //   await expect(element(by.id('home-button'))).toExist();
    //   await expect(element(by.id('fav-button'))).toExist();
    // });

    // it('should change Tab to favorites', async () => {
    //   let favTab = element(by.id('fav-button'));

    //   await expect(favTab).toExist();
    //   await favTab.tap();

    //   await expect(element(by.id('fav-list'))).toBeVisible();

    // });
});
