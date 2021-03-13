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
        name: "choices",
        choices: [
          "Add department.",
          "Add role.",
          "Add employee.",
          "View department.",
          "View roles.",
          "View employees.",
          "Update employee role.",
          "Exit.",
        ],
      },
    ])
    .then((response) => {
      const { menu } = response;
      if (menu === "Add department.") {
        newDepartment();
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

//   * View departments, roles, employees

//   * Update employee roles
