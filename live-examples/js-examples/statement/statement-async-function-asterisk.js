async function* randomNumbers() {
  const url = 'https://www.random.org/decimal-fractions/?num=1&dec=10&col=1&format=plain&rnd=new';

  console.log('Print randomly generated numbers until reset is clicked, or the random number exceeds 0.95');
  while (true) {
    const response = await fetch(url);
    const text = await response.text();
    yield Number(text);
  }
}

async function printRandoms() {
  for await (const number of randomNumbers()) {
    console.log(number);
    if (number > 0.95) { break; }
  }
}

printRandoms();
