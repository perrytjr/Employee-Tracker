DROP DATABASE IF EXISTS employeedata_DB;

CREATE DATABASE employeedata_DB;

USE employeedata_DB;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT, 
    [name] VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE [role] (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT,
    PRIMARY KEY (id)
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR (30) NOT NULL, 
    last_name VARCHAR (30) NOT NULL,
    role_id INT,
    manager_id INT,
    PRIMARY KEY (id)
);


