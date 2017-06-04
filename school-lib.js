
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

module.exports = {
  Person  : Person,
  Student : Student,
  Teacher : Teacher,
  Class   : Class
};
