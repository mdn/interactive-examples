const humans = [
  {
    name: 'Human 1',
    phones: [
      { type: 'cellphone', number: '9.9999-9999' },
      { type: 'landline', number: '3444-4444' },
    ],
  },
  {
    name: 'Human 2',
    phones: [
      { type: 'cellphone', number: '9.7777-7777' },
      { type: 'cellphone', number: '9.6666-6666' },
      { type: 'landline', number: '3466-6666' },
    ],
  },
];

const flatten = humans.flatMap((human) => human.phones);

console.log(flatten);
/* expected output: [
  { type: 'cellphone', number: '9.9999-9999' },
  { type: 'landline', number: '3444-4444' },
  { type: 'cellphone', number: '9.7777-7777' },
  { type: 'cellphone', number: '9.6666-6666' },
  { type: 'landline', number: '3466-6666' }
]
*/
