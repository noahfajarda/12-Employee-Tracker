const { prompt } = require("inquirer");
const db = require("./db/connection");
const { viewAllDepartments, viewAllRoles } = require("./db/roles");
const { viewAllEmployees } = require("./db/employees");
const { addDepartment } = require("./db/addDepartment");
const { updateRole } = require("./db/updateRole");

const backToStart = () => setTimeout(() => start(), 2000);

console.log("Welcome to the Employee Manager!");
// use ASYNC & AWAIT for all of your promises
const start = async () => {
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
            backToStart();
            break;
        case "View all employees":
            const employees = await viewAllEmployees();
            console.table(employees);
            backToStart();
            break;
        case "View all roles":
            const roles = await viewAllRoles();
            console.table(roles);
            backToStart();
            break;
        case "Add a department":
            const { newDepartment } = await prompt([
                {
                    type: "input",
                    name: "newDepartment",
                    message:
                        "What is the name of the new department you would like to add?",
                },
            ]);

            const createdDepartment = await addDepartment(newDepartment);
            // console.log(createdDepartment.affectedRows);

            if (createdDepartment) {
                const updatedDepartments = await viewAllDepartments();
                console.table(updatedDepartments);
            }

            backToStart();
            break;
        // TODO
        case "Add a role":
            backToStart();
            break;
        case "Update an employee role":
            // array of role objects
            const updateRolesView = await viewAllRoles();
            // array of all roles
            const roleChoices = updateRolesView.map((role) => ({
                name: role.title,
                value: role.id,
            }));

            // console.log(updateRolesView);
            const { first, last, role } = await prompt([
                {
                    type: "input",
                    name: "first",
                    message: "What is the first name of the employee?",
                },
                {
                    type: "input",
                    name: "last",
                    message: "What is the last name of the employee?",
                },
                {
                    type: "list",
                    name: "role",
                    message: "Which role do they have now?",
                    choices: roleChoices,
                },
            ]);

            const newRole = await updateRole(first, last, role);
            console.log(newRole);
            backToStart();
            break;

        case "Exit":
            // method to exit program
            process.on("exit", function (code) {
                return console.log(`Goodbye!`);
            });
            setTimeout(function () {
                return process.exit(22);
            }, 300);

        // case "Add a role": DONE
        // case "Add an employee": DONE
        // case "Update an employee role": DONE
    }
};

start();

// TODO FOR TUTORING SESSION:
// adding into database DONE
// back option for view employees/departments/roles DONE

// EXTRA TODOS:
// show a list of managers/employees
