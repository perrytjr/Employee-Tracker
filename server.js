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
                    addRoles();
                    break;

                case "Add employee":
                    addEmployee();
                    break;

                case "View departments":
                    viewDepartment();
                    break;

                case "View Roles":
                    viewRoles();
                    break;

                case "View employees":
                    viewEmployees();
                    break;

                case "Update employee role":
                    updateemployeeRole();
                    break;

                case "Finished":
                    connection.end();
                    break;
        }

    });
}

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
