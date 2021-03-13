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

// * The command-line application should allow users to:

function firstQuestion() {
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
        updateRole();
      } else if (choice === "Exit") {
        console.log("Goodbye!");
        connection.end();
      }
    });
}

//   * Add departments, roles, employees

function newDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the Department name?",
        validate: (input) => {
          if (input.trim().length <= 0) {
            return "Invalid entry. Please try again.";
          } else {
            return true;
          }
        },
      },
    ])
    .then((response) => {
      response.name = response.name;
      insertDepartment(response);
    });
}
function insertDepartment(data) {
  connection.query("INSERT department SET ?", data, (err) => {
    if (err) return console.error(err);
    console.log("Department added.");
    firstQuestion();
  });
}

function newRole() {
  choices = choices.map((dbData) => {
    return { name: dbData.name, value: { ...dbData } };
  });
  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "What is the role name?",
        validate: (input) => {
          if (input.trim().length <= 0) {
            return "Invalid entry. Please try again.";
          } else {
            return true;
          }
        },
      },
      {
        type: "input",
        name: "salary",
        message: "What is the annual salary for this role?",
        validate: (input) => {
          if (isNaN(parseInt(input))) {
            return "Invalid entry. Please try again.";
          } else {
            return true;
          }
        },
      },
      {
        type: "list",
        name: "department_id",
        message: "To which department does this role belong?",
        choices: choices,
      },
    ])
    .then((response) => {
      console.log(response);
    });
}

// * **title** -  VARCHAR(30) to hold role title
// * **salary** -  DECIMAL to hold role salary
// * **department_id** -  INT to hold reference to department role belongs to
// function insertRole()

// function newEmployee()

// * **id** - INT PRIMARY KEY
// * **first_name** - VARCHAR(30) to hold employee first name
// * **last_name** - VARCHAR(30) to hold employee last name
// * **role_id** - INT to hold reference to role employee has
// * **manager_id** - INT to hold reference to another employee that manages the employee being Created. This field may be null if the employee has no manager

// function insertEmployee()

//   * View departments, roles, employees

// function viewDepartment()

// function viewRoles()

// function viewEmployees()

//   * Update employee roles

// function updateRole()
