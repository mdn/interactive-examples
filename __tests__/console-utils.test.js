const consoleUtils = require('../js/editor-libs/console-utils');

test('Array formatting', function() {
    expect(consoleUtils.formatArray(new Array(1, 2, 3, 4))).toBe('1, 2, 3, 4');
});

test('Object formatting', function() {
    expect(consoleUtils.formatObject(new Int8Array(4))).toBe(
        'Int8Array [0, 0, 0, 0]'
    );

    expect(consoleUtils.formatObject(new DataView(new ArrayBuffer()))).toBe(
        'DataView {}'
    );
});
