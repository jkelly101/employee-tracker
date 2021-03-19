DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;


CREATE TABLE departments(
id INTEGER auto_increment NOT NULL,
department VARCHAR(30) NOT NULL,

PRIMARY KEY(id)
);

CREATE TABLE roles(
id INTEGER auto_increment NOT NULL,
title VARCHAR(30) NOT NULL,
salary DECIMAL(8, 2) NOT NULL,
departments_id INTEGER,

FOREIGN KEY (departments_id) REFERENCES departments(id),
PRIMARY KEY(id)
);

CREATE TABLE employees(
id INTEGER auto_increment NOT NULL,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
roles_id INTEGER,
manager_id INTEGER,
FOREIGN KEY (roles_id) REFERENCES roles(id),
PRIMARY KEY(id)
);

INSERT INTO departments (department) VALUES ("Sales");
INSERT INTO departments (department) VALUES ("Engineering");
INSERT INTO departments (department) VALUES ("Finance");

INSERT INTO roles (title, salary, departments_id) VALUES ("Sales Lead", 100000, 1);
INSERT INTO roles (title, salary, departments_id) VALUES ("Lead Engineer", 150000, 2);
INSERT INTO roles (title, salary, departments_id) VALUES ("Accountant", 125000, 3);


INSERT INTO employees (first_name, last_name, roles_id, manager_id) VALUES ("Jen", "Kelly", 1, 1);
INSERT INTO employees (first_name, last_name, roles_id, manager_id) VALUES ("Tom", "Cruz", 2, 2);
INSERT INTO employees (first_name, last_name, roles_id, manager_id) VALUES ("Matt", "Smith", 3, 3);

USE employee_db;
SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.department, roles.salary, employees.manager_id FROM employees LEFT JOIN roles ON employees.roles_id = roles.id
LEFT JOIN departments ON roles.departments_id = departments.id
-- LEFT JOIN employees ON employees.manager_id = employees.id;