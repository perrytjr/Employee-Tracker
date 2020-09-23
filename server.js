const mysql = requirer("mysql");
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
            "Update employee role"
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
                    updateemployeeRoles();
                    default:
                        buildteamPage(); //figure this out tmrw maybe connection end not sure yet. 
        }

    });
}