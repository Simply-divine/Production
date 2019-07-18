/*
method 1 for object creation
*/
const emp = {
    firstName: "Hardik",
    lastName: "Upadhyay",
    age: 18,
}
delete emp.age;
emp.age = 19;
console.log(emp.firstName + " " + emp.lastName + " " + emp.age);
//another technique is using emp["firstname"] or emp[expression] where expression="firstname" for eg
x = emp;
x.age = 13;
//notice that objects are mutable
console.log(emp.age);
/*
method 2
*/
//this method is not preferable as it is quite slow and also less secure
var x = new Object;
x.age = 18;
x.firstName = "hardik";
x.lastName = "upadhyay";
//console.log(x);
/*
method 3
*/
//using object constructor
function myfunc(firstName, lastName, age) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
}
var har = new myfunc("hardik", "upadhyay", 19);
console.log(har);
//getter methods