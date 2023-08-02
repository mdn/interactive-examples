const language = {
  set current(name) {
    this.log.push(name);
  },
  log: [],
};

language.current = 'EN';
language.current = 'FA';

console.log(language.log);
// Expected output: Array ["EN", "FA"]
