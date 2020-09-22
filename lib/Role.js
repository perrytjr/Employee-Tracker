class Role {
    constructor(title, salary, departmentId) {
        this.title = title;
        this.salary = salary;
        this.departmentId = departmentId;

};
getTitle () {
     return this.title;

};
getSalary () {
    return this.salary;

};
getDepartmentID () {
    return this.departmentId;

};



}

module.exports = Role;