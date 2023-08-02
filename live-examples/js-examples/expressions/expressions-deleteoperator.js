const Employee = {
  firstname: 'John',
  lastname: 'Doe',
};

console.log(Employee.firstname);
// Expected output: "John"

delete Employee.firstname;

console.log(Employee.firstname);
// Expected output: undefined
