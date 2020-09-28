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

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    console.log(` 
    ______                 _                         _______             _             
   |  ____|               | |                       |__   __|           | |            
   | |__   _ __ ___  _ __ | | ___  _   _  ___  ___     | |_ __ __ _  ___| | _____ _ __ 
   |  __| | _  _ \| _ \| |/ _ \| | | |/ _ \/ _ \    | | __/ _ |/ __| |/ / _ \ __|
   | |____| | | | | | |_| | | |_| | |_| |  __/  __/    | | | | |_| | |__|   <  __/ |   
   |______|_| |_| |_| .__/|_|\___/ \__, |\___|\___|    |_|_|  \__,_|\___|_|\_\___|_|   
                    | |             __/ |                                              
                    |_|            |___/                                      
    
    `);
    manageEmployees();

});

function manageEmployees() {
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
                "Delete a employee",
                "Delete a department",
                "Finished"

            ]
        }
    ]).then(function (yourChoice) {
        switch (yourChoice.makeAdjustment) {
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

            case "Delete a employee":
                deleteEmployee();
                break;

            case "Delete a department":
                deleteDepartment();
                break;

            case "Finished":
                connection.end();
                break;
        }

    });
}
// add departments roles and employee functions 
function addDepartment() {
    inquirer.prompt({
        type: "input",
        message: "What department would you like to add?",
        name: "name"
    }).then(function (res) {
        connection.query(
            "INSERT INTO department SET ?",
            {
                name: res.name
            },
            function (err, res) {
                if (err) throw err;
               
                  viewDepartment();
            }

          
        )
    });
}

function addRole() {

    connection.query(
        "SELECT name, id FROM department",
        function (error, response) {
            if (error) throw error;
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
            type: "list",
            name: "department_id",
            message: "What is the new roles department?",
            choices: response.map((department) => {
                return {
                    name: department.name,
                    value: department.id
                }
            })
        },
    ]).then(function (res) {
        connection.query(
            "INSERT INTO role SET ?", 
            {
                title: res.title,
                salary: res.salary,
                department_id: res.department_id
            },
            function (err, res) {
                if (err) throw err;
                console.table(res);
                console.log("Role added");
                viewRole();
            })

    })
})

}

function addEmployee() {
    connection.query(
        "SELECT title, id FROM role",
        function (err, res) {
            if (err) throw err;


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
                    type: "list",
                    name: "role_id",
                    message: "What is the employee's role?",
                    choices: res.map((role) => {
                        return {
                            name: role.title,
                            value: role.id
                        }
                    })
                },
                {
                    type: "list",
                    name: "manager_id",
                    message: "Who is the manager for this employee",
                    choices: res.map((employee) => {
                        return {
                            name: employee.name,
                            value: employee.id
                        }
                    })
                },

            ]).then(function (res) {
                connection.query("INSERT INTO employee SET ?",
                {
                    first_name: res.first_name,
                    last_name: res.last_name,
                    role_id: res.role_id,
                    manager_id: res.manager_id
                },
                    function (err, res) {
                        if (err) throw err;
                        console.table(res);
                        console.log("Employee added");
                        viewEmployees();
                    })

            })
        })
}



function updateEmployeeRole() {
    connection.query("SELECT title, id FROM role",
        function (err, res) {
            if (err) throw err;
            inquirer.prompt([
                {
                    type: "list",
                    name: "id",
                    message: "Please select the specific id for the employee you wish to change role?",
                    choices: res.map((employee) => {
                        return {
                            name: employee.name,
                            value: employee.id
                        };
                    })
                },
                {
                    type: 'list',
                    name: "roleId",
                    message: "What is the new role for this employee?",
                    choices: res.map((role) => {
                        return {
                            name: role.title,
                            value: role.id
                        };
                    })
                }
            ]).then(function (res) {
                connection.query(
                    `UPDATE employee SET role_id = ? WHERE id = ?`,
                    [res.roleId, res.id],
                    function (err, res) {
                        if (err) throw err;
                        viewEmployees();
                    }
                )
            })
        })
}
function deleteEmployee(){

    connection.query("SELECT * FROM employee", function(err, res) {
        if (err) throw err;
        var employeeArray = res.map(function(employee) {
            return employee.first_name + ' ' + employee.last_name
        });
        inquirer.prompt([
            {
                type: "list",
                name: "employee",
                message: "Which employee would you like to delete?",
                choices: employeeArray

                }
        ]).then(function(res){
            var fullName = res.employee.split(" ");

            connection.query( `DELETE FROM employee WHERE (first_name = '${fullName[0]}') AND (last_name = '${fullName[1]}')`,
            
            function (err, res) {
                if (err) throw err;
                viewEmployees();
            }
                
            )
        })
    })
}

function deleteDepartment(){
    
    connection.query("SELECT * FROM department", function(err, res) {
        if (err) throw err;
        var departmentArray = res.map(function(department) {
            return department.name
        });
        inquirer.prompt([
            {
                type: "list",
                name: "department",
                message: "Which department would you like to delete?",
                choices: departmentArray

                }
        ]).then(function(res){
            var deletedept = res.department

            connection.query( `DELETE FROM department WHERE (name = '${deletedept}')`,
            
            function (err, res) {
                if (err) throw err;
                viewDepartment()
            }
                
            )
        })
    })
}

//view department roles and employee functions
function viewDepartment() {
    connection.query(
        "SELECT * FROM  department",
        function (err, res) {
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
    connection.query(
        "SELECT * FROM employee",
        function (err, res) {
            if (err) throw err;
            console.table(res);
            manageEmployees();
        })
}