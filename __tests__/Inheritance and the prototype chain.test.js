// test case for https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain
const others = require('../js/editor-libs/others');

describe('others', () => {
    describe('new String()', () => {
        test('String object', function () {
            expect(others.test(Object.values(new String('foo')))).toEqual(
                ['f', 'o', 'o',]
            );
        });
    });
});
describe('javascript: advanced', () => {
    describe('Inheritance and the prototype chain', () => {
        it(`Let's create an object o from function f with its own properties`, () => {
            let f = function () {
                this.a = 1;
                this.b = 2;
            }
            let o = new f();
            expect(o).toEqual({ a: 1, b: 2 })
            //add properties in f function's prototype
            f.prototype.b = 3;
            f.prototype.c = 4;
            o = new f()
            expect(o).toEqual({ a: 1, b: 2 })
            expect(o.c).toBe(4)
        })
        it('When an inherited function is executed, the value of this points to the inheriting object, not to the prototype object where the function is an own property', () => {
            var o = {
                a: 2,
                m: function () {
                    return this.a + 1;
                }
            };

            expect(o.m()).toBe(3); // 3
            // When calling o.m in this case, 'this' refers to o

            var p = Object.create(o);
            // p is an object that inherits from o

            p.a = 4; // creates a property 'a' on p
            expect(p.m()).toBe(5)
        })
        describe(`A "constructor" in JavaScript is "just" a function that happens to be called with the new operator.`, () => {
            function Graph() {
                this.vertices = [];
                this.edges = [];
            }

            Graph.prototype = {
                addVertex: function (v) {
                    this.vertices.push(v);
                }
            };

            var g = new Graph();
            expect(g).toEqual({ "edges": [], "vertices": [] })
            it(`it is necessary to use the hasOwnProperty method which all objects inherit from Object.prototype`, () => {
                expect(g.hasOwnProperty('vertices')).toBeTruthy();
                // true

                expect(g.hasOwnProperty('nope')).toBeFalsy();
                // false

                expect(g.hasOwnProperty('addVertex')).toBeFalsy();
                // false

                expect(g.__proto__.hasOwnProperty('addVertex')).toBeTruthy();
            })
        })
        it(`ECMAScript 5 introduced a new method: Object.create(). Calling this method creates a new object`, () => {
            var a = { a: 1 };
            // a ---> Object.prototype ---> null

            var b = Object.create(a);
            // b ---> a ---> Object.prototype ---> null
            expect(b.a).toBe(1); // 1 (inherited)

            var c = Object.create(b);
            // c ---> b ---> a ---> Object.prototype ---> null

            var d = Object.create(null);
            // d ---> null
            expect(d.hasOwnProperty).toBeUndefined();
        })
        it(`ECMAScript 2015 introduced a new set of keywords implementing classes`, () => {
            'use strict';

            class Polygon {
                constructor(height, width) {
                    this.height = height;
                    this.width = width;
                }
            }

            class Square extends Polygon {
                constructor(sideLength) {
                    super(sideLength, sideLength);
                }
                get area() {
                    return this.height * this.width;
                }
                set sideLength(newLength) {
                    this.height = newLength;
                    this.width = newLength;
                }
            }

            var square = new Square(2);
            expect(square).toEqual({ "height": 2, "width": 2 })
            expect(square.area).toBe(4)
        })
        it(`B shall inherit from A`, () => {
            function A(a) {
                this.varA = a;
            }

            // What is the purpose of including varA in the prototype when A.prototype.varA will always be shadowed by
            // this.varA, given the definition of function A above?
            A.prototype = {
                varA: null,  // Shouldn't we strike varA from the prototype as doing nothing?
                // perhaps intended as an optimization to allocate space in hidden classes?
                // https://developers.google.com/speed/articles/optimizing-javascript#Initializing-instance-variables
                // would be valid if varA wasn't being initialized uniquely for each instance
                doSomething: function () {
                    return 'a prototype'
                }
            };

            function B(a, b) {
                A.call(this, a);
                this.varB = b;
            }
            B.prototype = Object.create(A.prototype, {
                varB: {
                    value: null,
                    enumerable: true,
                    configurable: true,
                    writable: true
                },
                doSomething: {
                    value: function () { // override
                        A.prototype.doSomething.apply(this, arguments); // call super
                        // ...
                    },
                    enumerable: true,
                    configurable: true,
                    writable: true
                }
            });
            B.prototype.constructor = B;

            var b = new B('a', 'b');
            expect(b.varB).toEqual('b');
            expect(b.varA).toBe('a')
            expect(new A().doSomething()).toEqual('a prototype');

            b.doSomething()
            expect(new B().doSomething()).toBeUndefined();
        })
        it(`[[Prototype]] is looked at recursively,`, () => {
            const Foo = function () {
                this.someProp = 'someProp'
            }
            var o = new Foo();
            var o = new Object();
            o.prototype = Foo.prototype;
            Foo.call(o);

            expect(o.someProp).toBe('someProp');
        })
    })
})