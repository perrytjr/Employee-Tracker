


INSERT INTO department (name)
VALUE ("Sales");
INSERT INTO department (name)
VALUE ("Production");
INSERT INTO department (name)
VALUE ("Accounting");

INSERT INTO role (title, salary, department_id)
VALUE ("Sales Manager", 100000, 1);
INSERT INTO role (title, salary, department_id)
VALUE ("Sales Rep", 65000, 1);
INSERT INTO role (title, salary, department_id)
VALUE ("Accountant", 80000, 3);
INSERT INTO role (title, salary, department_id)
VALUE ("Production Manager", 75000, 2);
INSERT INTO role (title, salary, department_id)
VALUE ("Line Operator", 40000, 2);

INSERT INTO employee (first_name, last_name,  role_id, manager_id)
VALUE ("Jennifer", "Jones", 1, null);
INSERT INTO employee (first_name, last_name,  role_id, manager_id)
VALUE ("Derek", "Hernandez", 2, null);
INSERT INTO employee (first_name, last_name,  role_id, manager_id)
VALUE ("Perry","Theobald",3,null);
INSERT INTO employee (first_name, last_name,  role_id, manager_id)
VALUE ("Sal", "Godoy", 4, 1);
INSERT INTO employee (first_name, last_name,  role_id, manager_id)
VALUE ("Carla", "Perez", 5, 4);




SELECT id, first_name, last_name, department.name, role.title 
 FROM employee JOIN role
 ON employee.role_id = role.id 
 JOIN department ON role.department_id = department.id
 ORDER BY employee.id;

 SELECT first_name, last_name, title AS title 
 FROM employee JOIN 
 role ON employee.id = role.id;