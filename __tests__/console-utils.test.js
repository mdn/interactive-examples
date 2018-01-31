const consoleUtils = require('../js/editor-libs/console-utils');

describe('console utils', () => {
    describe('formatOutput', () => {
        test('String object', function() {
            expect(consoleUtils.formatOutput(new String('foo'))).toBe(
                'String { "foo" }'
            );
        });
        test('Object.getPrototypeOf should return String { "" }', function() {
            expect(
                consoleUtils.formatOutput(Object.getPrototypeOf('foo'))
            ).toBe('String { "" }');
        });
    });

    describe('formatArray', () => {
        test('Array formatting', function() {
            expect(consoleUtils.formatArray(new Array(1, 2, 3, 4))).toBe(
                '1, 2, 3, 4'
            );
        });
    });

    describe('formatObject', () => {
        test('Int8Array', () => {
            expect(consoleUtils.formatObject(new Int8Array(4))).toBe(
                'Int8Array [0, 0, 0, 0]'
            );
        });
        test('ArrayBuffer nested inside DataView', () => {
            expect(
                consoleUtils.formatObject(new DataView(new ArrayBuffer()))
            ).toBe('DataView {}');
        });
        test('Empty object', () => {
            expect(consoleUtils.formatObject({})).toBe('Object {  }');
        });
        describe('Simple object', () => {
            test('string -> numbers', () => {
                expect(consoleUtils.formatObject({ a: 1, b: 2, c: 3 })).toBe(
                    'Object { a: 1, b: 2, c: 3 }'
                );
            });
            test('string -> mix of number and strings', () => {
                expect(
                    consoleUtils.formatObject({ a: 1, b: 'something', c: 3 })
                ).toBe('Object { a: 1, b: "something", c: 3 }');
            });
            test('string -> mix of number and null', () => {
                expect(consoleUtils.formatObject({ a: 1, b: null, c: 3 })).toBe(
                    'Object { a: 1, b: null, c: 3 }'
                );
            });
        });
        describe('Nested object', () => {
            test('string -> numbers', () => {
                expect(
                    consoleUtils.formatObject({ a: 1, b: { d: 2, e: 4 }, c: 3 })
                ).toBe('Object { a: 1, b: Object { d: 2, e: 4 }, c: 3 }');
            });
            test('string -> mix of array and numbers', () => {
                expect(
                    consoleUtils.formatObject({ a: 1, b: [1, 2, 3], c: 3 })
                ).toBe('Object { a: 1, b: Array [1, 2, 3], c: 3 }');
            });
        });
    });
});
