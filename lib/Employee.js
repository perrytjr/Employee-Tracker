class Employee {
    constructor(firstName, lastName, role, manager) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = role;
        this.manager = manager;
    };
    getName () {
         return this.firstName + '' + this.lastName;

    };
    getRole () {
        return this.role;

    };
    getManager () {
        return this.manager;

    };
   
}

module.exports = Employee;