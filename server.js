const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require("console.table");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "jkelly101",
  database: "employee_db",
});

connection.connect((err) => {
  if (err) throw err;
  firstQuestion();
});

function firstQuestion() {
  connection.query("SELECT department, id FROM departments", (err, results) => {
    if (err) return console.error(err);
    departments = results;
  });

  connection.query("SELECT title, id FROM roles", (err, results) => {
    if (err) return console.error(err);
    roles = results;
  });
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        name: "choice",
        choices: [
          "Add department",
          "Add role",
          "Add employee",
          "View department",
          "View roles",
          "View employees",
          "Update employee role",
          "Delete employee",
          "Exit",
        ],
      },
    ])
    .then((response) => {
      const { choice } = response;
      if (choice === "Add department") {
        newDepartment();
      } else if (choice === "Add role") {
        newRole();
      } else if (choice === "Add employee") {
        newEmployee();
      } else if (choice === "View department") {
        viewDepartment();
      } else if (choice === "View roles") {
        viewRoles();
      } else if (choice === "View employees") {
        viewEmployees();
      } else if (choice === "Update employee role") {
        updateEmployee();
      } else if (choice === "Delete employee") {
        deleteEmployee();
      } else if (choice === "Exit") {
        console.log("Goodbye!");
        connection.end();
      }
    });
}

const validateInput = (input) => {
  if (input.trim().length <= 0) {
    return "Invalid entry. Please try again.";
  } else {
    return true;
  }
};

const validateNum = (input) => {
  if (isNaN(parseInt(input))) {
    return "Invalid entry. Please try again.";
  } else {
    return true;
  }
};

function newDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the Department name?",
        validate: validateInput,
      },
    ])
    .then((response) => {
      response.name = response.name;
      insertDepartment(response);
    });
}
function insertDepartment(data) {
  connection.query("INSERT departments SET ?", data, (err) => {
    if (err) return console.error(err);
    console.log("Department added.");
    firstQuestion();
  });
}

function newRole() {
  departmentChoices = departments.map((dbData) => {
    return { name: dbData.name, value: dbData.id };
  });
  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "What is the role name?",
        validate: validateInput,
      },
      {
        type: "input",
        name: "salary",
        message: "What is the annual salary for this role?",
        validate: validateNum,
      },
      {
        type: "list",
        name: "departments_id",
        message: "To which department does this role belong?",
        choices: departmentChoices,
      },
    ])
    .then((response) => {
      response.departments_id = parseInt(response.departments_id);
      response.salary = parseInt(response.salary);
      insertRole(response);
    });
}
function insertRole(data) {
  connection.query("INSERT roles SET ?", data, (err) => {
    if (err) return console.error(err);
    console.log("Role added.");
    firstQuestion();
  });
}

function newEmployee() {
  roleChoices = roles.map((dbData) => {
    return { name: dbData.title, value: dbData.id };
  });
  inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "What is employee's first name?",
        validate: validateInput,
      },
      {
        type: "input",
        name: "last_name",
        message: "What is employee's last name?",
        validate: validateInput,
      },
      {
        type: "list",
        name: "roles_id",
        message: "What is their role?",
        choices: roleChoices,
      },
      {
        type: "input",
        name: "manager_id",
        message: "What is the Manager ID?",
        validate: validateNum,
      },
    ])
    .then((response) => {
      response.roles_id = parseInt(response.roles_id);
      response.manager_id = parseInt(response.manager_id);
      insertEmployee(response);
    });
}
function insertEmployee(data) {
  connection.query("INSERT employees SET ?", data, (err) => {
    if (err) return console.error(err);
    console.log("Employee added.");
    firstQuestion();
  });
}

function viewDepartment() {
  connection.query("SELECT * FROM departments", (err, results) => {
    if (err) return console.error(err);
    console.table(results);
    firstQuestion();
  });
}

function viewRoles() {
  connection.query("SELECT * FROM roles", (err, results) => {
    if (err) return console.error(err);
    console.table(results);
    firstQuestion();
  });
}

function viewEmployees() {
  connection.query(
    "SELECT employees.id, employees.first_name, employees.last_name, roles.title, roles.salary, departments.department, employees.manager_id FROM employees LEFT JOIN roles ON employees.roles_id = roles.id LEFT JOIN departments ON roles.departments_id = departments.id",
    (err, results) => {
      if (err) return console.error(err);
      console.table(results);
      firstQuestion();
    }
  );
}

function updateEmployee() {
  connection.query("SELECT * FROM employees", (err, results) => {
    if (err) return console.error(err);
    let allEmployees = results.map((dbData) => {
      return {
        name: dbData.first_name + " " + dbData.last_name,
        value: { ...dbData },
      };
    });
    roleChoices = roles.map((dbData) => {
      return { name: dbData.title, value: dbData.id };
    });

    inquirer
      .prompt([
        {
          type: "list",
          name: "chosen",
          message: "Which employee would you like to update?",
          choices: allEmployees,
        },
        {
          type: "list",
          name: "role",
          message: "What is employee's new role?",
          choices: roleChoices,
        },
      ])
      .then((response) => {
        let { chosen, role } = response;
        role = parseInt(role);
        updateRole(chosen, role);
      });
  });
}

function updateRole(chosen, role) {
  const setValue = { roles_id: role };
  const whereValue = { id: chosen.id };
  connection.query(
    "UPDATE employees SET ? WHERE ?",
    [setValue, whereValue],
    (err) => {
      if (err) return console.error(err);
      console.log("Employee updated.");
      firstQuestion();
    }
  );
}

function deleteEmployee(chosen, employee) {
  connection.query("SELECT * FROM employees", (err, results) => {
    if (err) return console.error(err);
    allEmployees = results.map((dbData) => {
      return {
        name: dbData.first_name + " " + dbData.last_name,
        value: { ...dbData },
      };
    });

    inquirer
      .prompt([
        {
          type: "list",
          name: "chosen",
          message: "Which employee would you like to delete?",
          choices: allEmployees,
        },
      ])

      .then((response) => {
        let { chosen, first_name, last_name } = response;
        first_name = parseInt(first_name);
        last_name = parseInt(last_name);

        chosenEmployee(chosen, first_name, last_name);
      });
  });
}

function chosenEmployee(chosen, employee) {
  const whereValue = { first_name: chosen.first_name };
  const whereValue2 = { last_name: chosen.last_name };

  connection.query(
    "DELETE FROM employees WHERE ? AND ?",
    [whereValue, whereValue2],
    (err) => {
      if (err) return console.error(err);
      console.log("Employee deleted.");
      firstQuestion();
    }
  );
}
