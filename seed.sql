INSERT INTO departments (name) VALUES ("IT");
INSERT INTO departments (name) VALUES ("HR");
INSERT INTO departments (name) VALUES ("Accounting");

INSERT INTO roles (title, salary, department_id) VALUES ("Software Engineer", 80000, 1);
INSERT INTO roles (title, salary, department_id) VALUES ("Accountant", 75000, 3);
INSERT INTO roles (title, salary, department_id) VALUES ("HR Rep", 70000, 2);


INSERT INTO employees (first_name, last_name, roles_id) VALUES ("Jen", "Kelly", 1);
INSERT INTO employees (first_name, last_name, roles_id) VALUES ("Tom", "Cruz", 2);
INSERT INTO employees (first_name, last_name, roles_id) VALUES ("Jason", "Voorhees", 3);