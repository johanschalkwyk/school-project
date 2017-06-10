//
// A program to keep track of students, their classes and the teachers who
// teach team
//
// Basic class design
//
//   A Person
//        hasa firstname, lastname
//
//   A Student isa Person
//        hasa student-id
//        hasa (attends) classes[]
//
//   A Teacher isa Person
//        hasa teacher-id (drivers-license)
//        hasa (teaches) classes[]
//
//   A class
//        hasa name
//        hasa Teacher
//        hasa Students[]
//
//  Write a program that builds a Math Class, History class, with
//  Students enrolled in each class, then when all students are added
//  print the details of each class (student, teacher)
//

var console = require('console');

function logArrayElements(element, index, array) {
  console.log('a[' + index + '] = ' + element.getRecord());
}

class Person {
  constructor(firstname, lastname) {
    this.firstname = firstname;
    this.lastname = lastname;
  }
  getName() {
    return this.firstname + " " + this.lastname;
  }
}

class Student extends Person {
  constructor(firstname, lastname, id) {
    super(firstname, lastname);
    this.id = id;
    this.classes = [];
  }
  getRecord() {
    return this.getName() + " " + this.id;
  }
}

class Teacher extends Person {
  constructor(firstname, lastname, license) {
    super(firstname, lastname);
    this.license = license;
    this.classes = [];
  }

  getRecord() {
    return this.getName() + " " + this.license;
  }

  addClass(clas) {
    this.classes.push(clas);
  }
}

class Class {
  constructor(name, teacher) {
    this.name = name;
    this.teacher = teacher.getName();
    this.students = [];
    teacher.addClass(this);
  }
  enrollStudent(student) {
    this.students.push(student);
  }
  printStudents() {
    this.students.forEach(logArrayElements);
  }
}

var anna = new Student("Julianna", "Schalkwyk", "12345");
console.log(anna);
console.log(anna.getName());
console.log(anna.getRecord());

var ellie = new Student("Eleanor", "Schalkwyk", "45678");

var pam = new Teacher("Pam", "Borowiec", "NYC-12345");
console.log(pam);
console.log(pam.getName());
console.log(pam.getRecord());

var math = new Class("math", pam);
math.enrollStudent(anna);
math.enrollStudent(ellie); 

console.log(math);
console.log(pam);

math.printStudents();
