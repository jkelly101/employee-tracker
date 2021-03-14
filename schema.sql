DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;


CREATE TABLE departments(
id INTEGER auto_increment NOT NULL,
name VARCHAR(30) NOT NULL,

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