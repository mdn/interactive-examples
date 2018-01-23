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

    expect(consoleUtils.formatObject({})).toBe("Object {  }");

    expect(consoleUtils.formatObject({ a: 1, b: 2, c: 3 })).toBe(
        "Object { a: 1, b: 2, c: 3 }"
    );

    expect(consoleUtils.formatObject({ a: 1, b: "something", c: 3 })).toBe(
        'Object { a: 1, b: "something", c: 3 }'
    );

    expect(consoleUtils.formatObject({ a: 1, b: { d: 2, e: 4 }, c: 3 })).toBe(
        "Object { a: 1, b: Object { d: 2, e: 4 }, c: 3 }"
    );

    expect(consoleUtils.formatObject({ a: 1, b: [1, 2, 3], c: 3 })).toBe(
        "Object { a: 1, b: Array [1, 2, 3], c: 3 }"
    );

    expect(consoleUtils.formatObject({ a: 1, b: null, c: 3 })).toBe(
        "Object { a: 1, b: null, c: 3 }"
    );
});
