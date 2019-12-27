// class BankAccount {
//    constructor(ownerName, balance, accNum) {
//       this.ownerName = ownerName;
//       this.balance = balance;
//       this.accNum = accNum;
//       this.withdrawFlag = true;
//    }
//    deposit(addMoney) {
//       this.balance += addMoney;
//       console.log(`Your new balance is ${this.balance}`);
//    }
//    withdraw(value) {
//       if (!this.withdrawFlag){
//          console.log("You've been blocked");
//       } else {
//          if (this.balance - value >= 0) {
//             console.log(`You're new balance is ${this.balance - value}`);
//          } else {
//             console.log("Not enougth funds");
//          }
//       }
//    }
// }

// class CheckingAccount extends BankAccount {
//    constructor(ownerName, balance, accNum, overdraftEnabled) {
//       super(ownerName, balance, accNum);
//       this.overdraftEnabled = overdraftEnabled;
//    }
//    withdraw() {
//       console.log(`Withdraw new feature: ${this.overdraftEnabled}`);
//    }
// }

// class SavingAccount extends BankAccount {
//    constructor(ownerName, balance, accNum) {
//       super(ownerName, balance, accNum);
//    }
//    withdraw() {
//       this.withdrawFlag = false;
//    }
// }

// let acc1 = new BankAccount("Roger", 5000, 12345);
// console.log(acc1);
// acc1.withdraw(300);

// let acc2 = new CheckingAccount("Hiroshi", 6000, 54321, " more money")
// console.log(acc2);
// acc2.withdraw();

// let acc3 = new SavingAccount("Takeshita", 7000, 9876);
// console.log(acc3);
// acc3.withdraw();
// console.log(acc3);

class Person {
   constructor(firstName, lastName) {
      this.firstName = firstName;
      this.lastName = lastName;
   }
   sayHello() {
      console.log(`Hello, I'm ${this.firstName} ${this.lastName}`);
   }
}

let newPerson1 = new Person("Roger", "Takeshita");
newPerson1.sayHello();

class Employee extends Person {
   constructor(firstName, lastName, company, wage) {
      super(firstName, lastName);
      this.company = company;
      this.wage = wage;
      this.active = true;
   }
   receiveRaise(updateWage) {
      this.wage += updateWage;
      console.log(`${this.firstName} new wage $${this.wage}`);
   }
   terminate() {
      this.active = false;
      console.log(`${this.firstName} got fired`);
   }
}

let newPerson2 = new Employee("Thaisa","Sakima","Rogers", 5000);
console.log(newPerson2);
newPerson2.receiveRaise(1000);
newPerson2.terminate();

class Manager extends Employee {
   constructor(firstName, lastName, company, wage, department) {
      super(firstName, lastName, company, wage);
      this.department = department;
   }
   giveRaise(updateWage) {
      this.receiveRaise(updateWage);
   }
}

let newPerson3 = new Manager ("Yumi", "Sakima", "Telus", 6400, "Call Center");
console.log(newPerson3);
newPerson3.receiveRaise(2000);

class Worker extends Employee {
   constructor(firstName, lastName, company, wage, manager) {
      super(firstName, lastName, company, wage);
      this.manager = manager;
   }
   fireHimHer() {
      this.active = false;
   }
}

let newPerson4 = new Worker("Bruno", "Antonio", "GA", "3600", "Adm");
console.log(newPerson4);
newPerson4.fireHimHer();