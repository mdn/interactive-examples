async function getFromList() {
  const url = 'https://www.random.org/decimal-fractions/?num=1&dec=10&col=1&format=plain&rnd=new';

  const arrayOfFetches = [
    doFetch(url),
    doFetch(url),
    doFetch(url)
  ];

  console.log('Regular iterator: promise objects are expected.');
  for (const item of arrayOfFetches) {
    console.log(item);
  }

  console.log('Async iterator: values from resolved promises are expected.');
  for await (const item of arrayOfFetches) {
    console.log(item);
  }
}

async function doFetch(url) {
  const response = await fetch(url);
  const text = await response.text();
  return Number(text);
}

getFromList();
