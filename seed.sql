INSERT INTO departments (name) VALUES ("IT");
INSERT INTO departments (name) VALUES ("HR");
INSERT INTO departments (name) VALUES ("Accounting");

INSERT INTO roles (title, salary, departments_id) VALUES ("Software Engineer", 80000, 1);
INSERT INTO roles (title, salary, departments_id) VALUES ("Accountant", 75000, 3);
INSERT INTO roles (title, salary, departments_id) VALUES ("HR Rep", 70000, 2);


INSERT INTO employees (first_name, last_name, roles_id, manager_id) VALUES ("Jen", "Kelly", 1, 1);
INSERT INTO employees (first_name, last_name, roles_id, manager_id) VALUES ("Tom", "Cruz", 2, 2);
INSERT INTO employees (first_name, last_name, roles_id, manager_id) VALUES ("Jason", "Voorhees", 3, 3);