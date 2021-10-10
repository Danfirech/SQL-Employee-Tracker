const inquirer = require("inquirer");
const mysql = require("mysql2");
const { title } = require("process");
const util = require("util");
// const cTable = require("console.table");

let con = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password1",
  database: "tracker_db",
});

con.query = util.promisify(con.query);

con.connect((error) => {
  if (error) {
    console.log("error", error);
  } else {
    askQuestion();
  }
});

async function askQuestion() {
  const { questionStart } = await inquirer.prompt([
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

  if (questionStart === "view all departments") {
    viewDepartments();
  } else if (questionStart === "view all roles") {
    viewRolls();
  } else if (questionStart === "view all employees") {
    viewEmployee();
  } else if (questionStart === "add a department") {
    addDepartment();
  } else if (questionStart === "add a role") {
    addRole();
  } else if (questionStart === "add an employee") {
    addEmployee();
  } else if (questionStart === "update an employee role") {
    updateEmployee();
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

  function viewRolls() {
    let qString = "select * from employee_roll;";
    con.query(qString, function (error, res) {
      if (error) {
        console.log(error);
      } else {
        console.table(res);
      }
    });
  }

  function viewEmployee() {
    // let qString = `select manager. employee.id, employee.first_name, employee.last_name, employee_roll.title, employee_roll.salary
    //   from employee_roll
    //   inner join employee on employee.role_id = employee_roll.id
    //    ;`;

    let qString = "select * from employee";

    con.query(qString, function (error, res) {
      if (error) {
        console.log(error);
      } else {
        console.table(res);
      }
    });
  }

  async function addDepartment() {
    const { departmentName } = await inquirer.prompt([
      {
        type: "input",
        name: "departmentName",
        message: "What department would you like to add?",
      },
    ]);

    let qString = "insert into department set ?";
    con.query(
      qString,
      { department_name: departmentName },
      function (error, res) {
        if (error) {
          console.log(error);
        } else {
          console.table(res);
        }
      }
    );
  }

  // Add Role

  function addRole() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "roleName",
          message: "What is the name of the role?",
        },
        {
          type: "input",
          name: "salary",
          message: "What is the salary?",
        },
        {
          type: "input",
          name: "departId",
          message: "What is the department id?",
        },
      ])
      .then(function (answer) {
        con.query(
          `INSERT INTO role (title, salary, department_id) VALUES('${answer.roleName}', '${answer.salary}', '${answer.departId}')`,
          function (err, res) {
            if (err) throw err;
            console.table(res);
            askQuestion();
          }
        );
      });
  }

  //Add Employee

  function addEmployee() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "firstName",
          message: "What is the employee's first name?",
        },
        {
          type: "input",
          name: "lastName",
          message: "What is the employee's last name?",
        },
        {
          type: "input",
          name: "roleId",
          message: "What is the employee role id?",
        },
        {
          type: "input",
          name: "managerId",
          message: "What is the manager id?",
        },
      ])
      .then(function (answer) {
        con.query(
          `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES('${answer.firstName}', '${answer.lastName}', '${answer.roleId}', '${answer.managerId}' )`,
          function (err, res) {
            if (err) throw err;
            console.table(res);
            askQuestion();
          }
        );
      });
  }

  // UPDATE EMPLOYEE

  async function updateEmployee() {
    let allEmployees = await con.query("select * from employee");
    let allRolls = await con.query("select * from employee_roll");

    const employeeChoices = allEmployees.map((person) => {
      return {
        name: `${person.first_name} ${person.last_name}`,
        value: person.id,
      };
    });

    const rollChoices = allRolls.map((roll) => {
      return {
        name: roll.title,
        value: roll.id,
      };
    });

    const { employeeId, rollId } = await inquirer.prompt([
      {
        type: "list",
        name: "employeeId",
        message: "What employee would you like to upate?",
        choices: employeeChoices,
      },

      {
        type: "list",
        name: "rollId",
        message: "What employee Roll would you like to upate?",
        choices: rollChoices,
      },
    ]);

    let qString = "update employee set role_id = ? where id = ?";
    con.query(qString, [rollId, employeeId], function (error, res) {
      if (error) {
        console.log(error);
      } else {
        console.log("update was succesfull!");
      }
    });
  }
}
