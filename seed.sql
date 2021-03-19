INSERT INTO departments (name) VALUES ("Sales");
INSERT INTO departments (name) VALUES ("Engineering");
INSERT INTO departments (name) VALUES ("Finance");

INSERT INTO roles (title, salary, departments_id) VALUES ("Sales Lead", 100000, 1);
INSERT INTO roles (title, salary, departments_id) VALUES ("Lead Engineer", 150000, 2);
INSERT INTO roles (title, salary, departments_id) VALUES ("Accountant", 125000, 3);


INSERT INTO employees (first_name, last_name, roles_id, manager_id) VALUES ("Jen", "Kelly", 1, 1);
INSERT INTO employees (first_name, last_name, roles_id, manager_id) VALUES ("Tom", "Cruz", 2, 2);
INSERT INTO employees (first_name, last_name, roles_id, manager_id) VALUES ("Matt", "Smith", 3, 3);