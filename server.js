const mysql = require("mysql");
const Department = require("./lib/department");
const Employee = require("./lib/employee");
const Role = require("./lib/role");
const inquirer = require("inquirer");
const cTable = require('console.table');



var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // password
    password: "root",
    database: "employeedata_DB"
  });
  
  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    manageEmployees();
    
  });

function manageEmployees(){
    inquirer.prompt([
        {
        type: "list",
        name: "makeAdjustment",
        message: "What adjustment would you like to make to your employee information?",
        choices: [
            "Add department",
            "Add role",
            "Add employee",
            "View departments",
            "View roles",
            "View employees",
            "Update employee role",
            "Finished"
        
        ]
        }
    ]).then(function(yourChoice) {
        switch(yourChoice.makeAdjustment) {
            case "Add department":
                addDepartment();
                break;
                case "Add role":
                    addRole();
                    break;

                case "Add employee":
                    addEmployee();
                    break;

                case "View departments":
                    viewDepartment();
                    break;

                case "View roles":
                    viewRole();
                    break;

                case "View employees":
                    viewEmployees();
                    break;

                case "Update employee role":
                    updateEmployeeRole();
                    break;

                case "Finished":
                    connection.end();
                    break;
        }

    });
}
// add departments roles and employee functions 
function addDepartment(){
    inquirer.prompt({
        type: "input",
        message: "What department would you like to add?",
        name: "name"
    }).then(function(res){
        connection.query(
            "INSERT INTO department SET ?",
            {
                name: res.name
            },
            function(err, res) {
                if (err) throw err;
                connection.query("SELECT * FROM department",function(err, res){
                    console.table(res);
                    viewDepartment();
                })
            
            
        })
    });
}

function addRole() {
    inquirer.prompt([
        {
        type: "input",
        message: "Create title of role.",
        name: "title",
    },

    {
        type: "input",
        message: "What is the salary of this role?",
        name: "salary",
    },

    {
        type: "input",
        message: "What is the department Id?",
        name: "departmentId",
    }
]).then(function(res) {
    connection.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", 
    [res.title, parseInt(res.salary), parseInt(res.departmentId)], 
    function(err, res) {
        if (err) throw err;
        console.table(res);
        console.log("Role added");
        viewRole();
    })
 
});

}

function addEmployee() {
    inquirer.prompt([
        {
        type: "input",
        message: "What is the employees first name?",
        name: "first_name",
    },

    {
        type: "input",
        message: "What is the employees last name?",
        name: "last_name",
    },

    {
        type: "input",
        message: "What is the department Id?",
        name: "role_id",
    },
    {
        type: "input",
        message: "What is the managers name for this employee",
        name: "manager_id",
    }

]).then(function(res) {
    connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
     [res.first_name, (res.last_name),(res.role_id), (res.manager_id)], 
    function(err, res) {
        if (err) throw err;
        console.table(res);
        console.log("Employee added");
        viewEmployees();
    })
 
});

}

function updateEmployeeRole() {
    connection.query("SELECT * FROM employee", function(err, res) {
        if (err) throw err;
        var updateEmployee = res.map(function(employee) {
            return employee.first_name + ' ' + employee.last_name
        });

        inquirer        
            .prompt([
                {
                    type: "list",
                    message: "Which employee would you like to update?",
                    name: "employee",
                    choices: updateEmployee
                },
                {
                    type: 'input',
                    message: "What is the new role ID for the employee?",
                    name: "roleId"
                }
            ]).then(function(res) {
                var employeeName = res.employee.split(" ");

                connection.query(`UPDATE employee SET role_id = ${res.role_id} WHERE (first_name = '${employeeName[0]}') AND (last_name = '${employeeName[1]}')`, 
                    function(err, res) {
                   if (err) throw err;
                   viewEmployees();
                })
            })
    })  
}



//view department roles and employee functions
function viewDepartment() {
    connection.query("SELECT * FROM department", 
        function(err, res) {
        if (err) throw err;
        console.table(res);
        manageEmployees();
    })
}

function viewRole() {
    connection.query(
        "SELECT first_name, last_name, title, salary FROM employee JOIN role ON role_id = role.id",
        function (err, res) {
            if (err) throw err;
            console.table(res);
            manageEmployees();
        }
    )
}

function viewEmployees() {
    connection.query("SELECT * FROM employee", 
        function(err, res) {
        if (err) throw err;
        console.table(res);
        manageEmployees();
    })
}