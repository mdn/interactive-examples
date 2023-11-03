const url = new URL('https://example.com/index.php?title=Mozilla&action=edit');
const params = url.searchParams;

params.forEach((value, key) => console.log(`${key} - ${value}`));
// expected output: "title - Mozilla"
// expected output: "action - edit"
