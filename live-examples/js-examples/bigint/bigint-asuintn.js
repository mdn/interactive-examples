const max = 2n ** 64n - 1n;

function check64bit(number) {
  (number > max) ?
    console.log('Number doesn\'t fit in unsigned 64-bit integer!') :
    console.log(BigInt.asUintN(64, number));
}

check64bit(2n ** 64n);
// expected output: "Number doesn't fit in unsigned 64-bit integer!"

check64bit(2n ** 32n);
// expected output: 4294967296n
