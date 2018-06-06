describe('Tabbed Editor', () => {
    beforeAll(async () => {
        await page.goto('http://127.0.0.1:9000/pages/tabbed/table.html');
    });

    it('loads the expected HTML into the output element', async () => {
        const expectedOutput =
            '<style>.output{background-color:#fff;border:15px solid #eee;' +
            'box-shadow:inset 5px 5px 10px rgba(0, 0, 0, .3), inset -5px -5px 10px rgba(0, 0, 0, .2);' +
            'font-size:0.9rem;height:252px;line-height:1.5;margin:24px 1em 0 0;overflow:scroll;' +
            'padding:30px}</style>' +
            '<style>table,' +
            'td { border: 1px solid #333;}' +
            'thead,tfoot { background-color: #333; color: #fff;}' +
            '</style><div class="output"><table> <thead> <tr> ' +
            '<th colspan="2">The table header</th> </tr> </thead> ' +
            '<tbody> <tr> ' +
            '<td>The table body</td> ' +
            '<td>with two columns</td> ' +
            '</tr> </tbody> ' +
            '<tfoot> ' +
            '<tr> ' +
            '<td colspan="2">The table footer</td> ' +
            '</tr> </tfoot></table></div>';

        await page.waitForSelector('#output');

        let outputContent = await page.$eval('#output shadow-output', elem =>
            /* trim new lines, then trim matches of two or more consecutive
               whitespace characters with a single whitespace character */
            elem.shadowRoot.innerHTML
                .replace(/\r?\n|\r/g, '')
                .replace(/\s{2,}/g, ' ')
        );
        await expect(outputContent).toBe(expectedOutput);
    });

    it('should switch to CSS editor on tab click', async () => {
        await page.waitForSelector('#tablist');
        await page.click('#css');

        let cssPanelClassAttr = await page.$eval('#css-panel', elem =>
            elem.getAttribute('class')
        );

        let htmlPanelClassAttr = await page.$eval('#html-panel', elem =>
            elem.getAttribute('class')
        );

        await expect(cssPanelClassAttr).toBe('');
        await expect(htmlPanelClassAttr).toBe('hidden');
    });

    it('should switch to HTML editor on tab click', async () => {
        await page.waitForSelector('#tablist');
        // switch to CSS panel
        await page.click('#css');
        // then back to the HTML panel
        await page.click('#html');

        let cssPanelClassAttr = await page.$eval('#css-panel', elem =>
            elem.getAttribute('class')
        );

        let htmlPanelClassAttr = await page.$eval('#html-panel', elem =>
            elem.getAttribute('class')
        );

        await expect(cssPanelClassAttr).toBe('hidden');
        await expect(htmlPanelClassAttr).toBe('');
    });
});
