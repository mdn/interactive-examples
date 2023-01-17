//Creating a BigInt64Array with a length of 5
let myBigInt64Array1 = new BigInt64Array(5);

// Setting values in the array
myBigInt64Array1[0] = BigInt(5886014448488689);
myBigInt64Array1[1] = BigInt(1881938909131133);
myBigInt64Array1[2] = BigInt(1898875537769492);
myBigInt64Array1[3] = BigInt(2156704815705747);
myBigInt64Array1[4] = BigInt(3337090060496542);

console.log(myBigInt64Array1);

// Accessing a value in the array
console.log(myBigInt64Array1[2]);

// Using the forEach method to iterate through the array
myBigInt64Array1.forEach(function (value) {
  console.log(value);
});
