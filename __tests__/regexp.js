// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
describe(`Regular expressions are patterns used to match character combinations in strings. `, () => {
    it(`Creating a regular expression`, () => {
        const re = /ab+c/, re1 = new RegExp('ab+c');
        expect(re).toBeInstanceOf(Object)
        expect(re1).toBeInstanceOf(Object).toBeInstanceOf(RegExp)

    });
    it(`Escaping user input that is to be treated as a literal string within a regular expression`, () => {
        function escapeRegExp(string) {
            return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
        }
        const str = '.*+?^${}()|[\]\\]';
        expect(escapeRegExp(str)).toBe("\\.\\*\\+\\?\\^\\$\\{\\}\\(\\)\\|\\[\\]\\\\\\]")
        expect(new RegExp(escapeRegExp(str)).test('.*+?^${}()|[\]\\]')).toBeTruthy()
    })
    it(`uses the exec method to find a match in a string.`, () => {
        var myRe = /d(b+)d/g;
        var obj = myRe.exec('cdbbdbsbz');
        expect(obj).toBeInstanceOf(Object)
        expect(obj).toContain("dbbd")
        expect(obj).toContain("bb")
        expect(obj.index).toBe(1)
        expect(obj.input).toBe('cdbbdbsbz')
        const obj1 = ["dbbd", "bb"];
        obj1.input = 'cdbbdbsbz';
        obj1.index = 1;
        expect(obj).toEqual(obj1)
        const myRe1 = new RegExp('d(b+)d', 'g');
        expect(myRe1).toEqual(myRe)
    })
    it(`Results of regular expression execution, every occurrence is a new regular expression`, () => {
        var myRe = /d(b+)d/g;
        var myArray = myRe.exec('cdbbdbsbz');
        expect(myRe.lastIndex).toBe(5);
        var myArray = /d(b+)d/g.exec('cdbbdbsbz');
        expect(/d(b+)d/g.lastIndex).toBe(0);
    })
    it(`Using parenthesized substring matches`, () => {
        var re = /(\w+)\s(\w+)/;
        var str = 'John Smith';
        var newstr = str.replace(re, '$2, $1');
        expect(newstr).toBe(`Smith, John`);
    });
    it(``, () => {
        var re = /\w+\s/g;
        var str = 'fee fi fo fum';
        var myArray = str.match(re);
        expect(myArray).toEqual(['fee ', 'fi ', 'fo ']);
    })

})