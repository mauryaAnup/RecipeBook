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