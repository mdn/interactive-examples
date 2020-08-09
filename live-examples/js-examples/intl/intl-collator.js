function letterSort(lang, letters) {
  letters.sort(new Intl.Collator(lang).compare);
  return letters;
}

console.log(letterSort('de', ['a', 'z', 'ä']));
// expected output: Array ["a", "ä", "z"]

console.log(letterSort('sv', ['a', 'z', 'ä']));
// expected output: Array ["a", "z", "ä"]
