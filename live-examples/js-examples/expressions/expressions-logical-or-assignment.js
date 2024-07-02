const a = { duration: 50, title: '' };

a.duration ||= 10;
console.log(a.duration);
// Expected output: 50

a.title ||= 'title is empty.';
console.log(a.title);
// Expected output: "title is empty."
