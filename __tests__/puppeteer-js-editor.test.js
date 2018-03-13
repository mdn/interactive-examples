describe('JS Editor', () => {
    beforeAll(async () => {
        await page.goto('http://127.0.0.1:4444/pages/js/array-concat.html');
    });

    it('renders expected output after clicking Run', async () => {
        const expectedOutput = '> Array ["a", "b", "c", "d", "e", "f"]';
        let outputContent;

        await page.waitForSelector('#execute');
        await page.click('#execute');

        outputContent = await page.$eval('#output code', e =>
            e.innerText.trim()
        );
        await expect(outputContent).toBe(expectedOutput);
    });
});
