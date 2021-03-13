-- Design the following database schema containing three tables:

CREATE DATABASE employee_tracker_db;

USE employee_tracker_db;

-- * **department**:

--   * **id** - INT PRIMARY KEY
--   * **name** - VARCHAR(30) to hold department name

CREATE TABLE departments(
id INTEGER auto_increment NOT NULL,
name VARCHAR(50),
PRIMARY KEY(id)
);

-- * **role**:

--   * **id** - INT PRIMARY KEY
--   * **title** -  VARCHAR(30) to hold role title
--   * **salary** -  DECIMAL to hold role salary
--   * **department_id** -  INT to hold reference to department role belongs to

CREATE TABLE roles(
id INTEGER auto_increment NOT NULL,
title VARCHAR(50),
salary INTEGER NOT NULL,
department_id INTEGER,

PRIMARY KEY(id)
);

-- * **employee**:

--   * **id** - INT PRIMARY KEY
--   * **first_name** - VARCHAR(30) to hold employee first name
--   * **last_name** - VARCHAR(30) to hold employee last name
--   * **role_id** - INT to hold reference to role employee has
--   * **manager_id** - INT to hold reference to another employee that manages the employee being Created. This field may be null if the employee has no manager

CREATE TABLE employees(
id INTEGER auto_increment NOT NULL,
first_name VARCHAR(50),
last_name VARCHAR(50),
role_id INTEGER,
manager_id INTEGER,

PRIMARY KEY(id)
);