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
    return { name: dbData.name + "(" + dbData.bid + ")", value: { ...dbData } };
  });
  inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "What is the Role name?",
    },
    {
      type: "input",
      name: "salary",
      message: "What is the annual Salary?",
    },
    {
      type: "list",
      name: "department_id",
      message: "Which department does this role fall under?",
      choices: choices,
    },
  ]);
}
// * **title** -  VARCHAR(30) to hold role title
// * **salary** -  DECIMAL to hold role salary
// * **department_id** -  INT to hold reference to department role belongs to

//   * View departments, roles, employees

//   * Update employee roles
