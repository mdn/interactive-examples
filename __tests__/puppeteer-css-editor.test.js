describe('CSS Editor', () => {
    beforeAll(async () => {
        await page.goto('http://127.0.0.1:4444/pages/css/animation.html');
    });

    it('sets the example-element\'s style attribute to the correct value', async () => {
        const expectedStyleAttr =
            'animation: slidein 3s linear 1s infinite running;';

        await page.waitForSelector('#example-choice-list');
        await page.click('#example-choice-list .example-choice:nth-child(2)');

        let styleAttrVal = await page.$eval('#example-element', elem =>
            elem.getAttribute('style')
        );
        await expect(styleAttrVal).toBe(expectedStyleAttr);
    });
});
