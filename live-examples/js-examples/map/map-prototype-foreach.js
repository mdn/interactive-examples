function logMapElements(value, key, map) {
  console.log(`m[${key}] = ${value}`);
}

new Map([
  ['foo', 3],
  ['bar', {}],
  ['baz', undefined],
]).forEach(logMapElements);

// Expected output: "m[foo] = 3"
// Expected output: "m[bar] = [object Object]"
// Expected output: "m[baz] = undefined"
