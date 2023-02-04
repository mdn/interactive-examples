const buffer = new ArrayBuffer(40);
const bigint64 = new BigInt64Array(buffer);
bigint64[0] = 5886014448488689n;
bigint64[1] = 1881938909131133n;
bigint64[2] = 1898875537769492n;
bigint64[3] = 2156704815705747n;
bigint64[4] = 3337090060496542n;

bigint64[0] = 6118793953620967n;
console.log(bigint64); // Expected Output: BigInt64Array [6118793953620967n, 1881938909131133n, 1898875537769492n, 2156704815705747n, 3337090060496542n]
console.log(bigint64[2]); // Expected Output: 1898875537769492n
console.log(`Array length:`, bigint64.length); // Expected Output: Array length: 5
console.log(`Array byte length:`, bigint64.byteLength); // Expected Output: Array byte length: 40
console.log(`Array byte offset:`, bigint64.byteOffset); // Expected Output: Array byte offset: 0
bigint64.set([BigInt(100), BigInt(200)], 1);
console.log(bigint64); // Expected Output: BigInt64Array [6118793953620967n, 100n, 200n, 2156704815705747n, 3337090060496542n]
