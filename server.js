const mysql = requirer("mysql");
const Department = require("./lib/department");
const Employee = require("./lib/employee");
const Role = require("./lib/role");
const inquirer = require("inquirer");


















function manageEmployees(){
    inquirer.prompt([
        {
        type: "list",
        name: "makeAdjustment",
        message: "What adjustment would you like to make to your employee information?",
        choices: [
            "Add department",
            "Add roles",
            "Add employee",
            "View departments",
            "View roles",
            "View employees",
            "Update employee roles"
        ]
        }
    ]).then(function(yourChoice) {
        switch(yourChoice.makeAdjustment) {
            case "Add department":
                addDepartment();
                break;
                case "Add roles":
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
                case "Update employee roles":
                    updateemployeeRoles();
                    default:
                        buildteamPage(); //figure this out tmrw maybe connection end not sure yet. 
        }

    });
}