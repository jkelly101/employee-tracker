const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require('console.table');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "jkelly101",
    database: "employee-tracker_db"
  });

  connection.connect( (err) => {
    if(err) throw err;
    askQuestions();
});

// * The command-line application should allow users to:

//   * Add departments, roles, employees

//   * View departments, roles, employees

//   * Update employee roles

// function askQuestions(){
//     inquirer.prompt([
//         {
//             type: "list",
//             message: "",
//             name: "choice",
//             choices: [""]
//         }
//     ])