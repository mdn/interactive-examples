const others = require('../js/editor-libs/others');

describe('others', () => {
    describe('new String()', () => {
        test('String object', function () {
            expect(others.test(Object.values(new String('foo')))).toEqual(
                ['f', 'o', 'o']
            );
        });
    });
});