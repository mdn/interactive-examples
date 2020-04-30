const expr = 'Pears';
switch (expr) {
  case 'Oranges':
    console.log('Oranges are $0.59 a pound.');
    break;
  case 'Apples':
    console.log('Apples are $0.32 a pound.');
    break;
  default:
    console.log(`Sorry, we are out of ${expr}.`);
    // expected output: "Sorry, we are out of Pears."
}
