const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");

let con = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "tracker_db",
});

con.connect((error) => {
  if (error) {
    console.log("error", error);
  } else {
    console.log("success");
  }
});

async function askQuestion() {
  const results = await inquirer.prompt([
    {
      type: "list",
      name: "questionStart",
      message: "Please select",
      choices: [
        "view all departments",
        "view all roles",
        "view all employees",
        "add a department",
        "add a role",
        "add an employee",
        "update an employee role",
        "done",
      ],
    },
  ]);

  if (results.questionStart === "view all departments") {
    viewDepartments();
  }
}

function viewDepartments() {
  let qString = "select * from department;";
  con.query(qString, function (error, res) {
    if (error) {
      console.log("error");
    } else {
      console.table(res);
    }
  });
}

askQuestion();
