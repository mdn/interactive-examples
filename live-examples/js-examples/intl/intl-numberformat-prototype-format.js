const amount = 654321.987;

const options1 = { style: 'currency', currency: 'RUB' };
const numberFormat1 = new Intl.NumberFormat('ru-RU', options1);

console.log(numberFormat1.format(amount));
// expected output: "654 321,99 ₽"

const options2 = { style: 'currency', currency: 'USD' };
const numberFormat2 = new Intl.NumberFormat('en-US', options2);

console.log(numberFormat2.format(amount));
// expected output: "$654,321.99"
