const segmenter1 = new Intl.Segmenter('fr-FR');
const options1 = segmenter1.resolvedOptions();

console.log(options1.locale);
// Expected output: "fr-FR"

console.log(options1.granularity);
// Expected output: "grapheme"
