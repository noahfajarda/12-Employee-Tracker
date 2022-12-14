const { prompt } = require("inquirer");
const db = require("./db/connection");
const { viewAllDepartments } = require("./db/departments");
const { viewAllEmployees } = require("./db/employees");

// use ASYNC & AWAIT for all of your promises
const start = async () => {
    console.log("Welcome to the Employee Manager!");
    // 2. create prompts for options to view/manipulate database
    const { choice } = await prompt([
        {
            type: "list",
            name: "choice",
            message: "What would you like to do?",
            choices: [
                "View all departments",
                "View all roles",
                "View all employees",
                "Add a department",
                "Add a role",
                "Add an employee",
                "Update an employee role",
                "Exit",
            ],
        },
    ]);

    switch (choice) {
        case "View all departments":
            const departments = await viewAllDepartments();
            console.table(departments);
            break;
        case "View all employees":
            const employees = await viewAllEmployees();
            console.table(employees);
            break;
        // case "View all roles":
        // case "Add a department":
        // case "Add a role":
        // case "Add an employee":
        // case "Update an employee role":
        // case "Exit":
    }
};

start();

// TODO FOR TUTORING SESSION:
// back option for view employees/departments/roles
