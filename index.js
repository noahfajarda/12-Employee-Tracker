const { prompt } = require("inquirer");
const figlet = require("figlet");
const db = require("./db/connection");
const {
    viewAllDepartments,
    viewAllRoles,
    viewAllEmployees,
    viewManagers,
} = require("./db/view");
const { addDepartment, addRole, addEmployee } = require("./db/add");
const { updateRole } = require("./db/updateRole");
// helper function to capitalize first letter
const { capitalizeFirstLetter } = require("./util/upperHelper");

const backToStart = () =>
    setTimeout(() => {
        console.log("\n");
        start();
    }, 2000);

console.log(
    // refered to figlet documentation: https://www.npmjs.com/package/figlet
    // inspiration from mock-up: https://courses.bootcampspot.com/courses/2248/assignments/40012?module_item_id=765978
    figlet.textSync("Welcome to the Employee Manager!", {
        horizontalLayout: "default",
        verticalLayout: "default",
        width: 100,
        whitespaceBreak: true,
    })
);

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
                "View all managers",
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
        case "View all managers":
            const managers = await viewManagers();
            console.table(managers);
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

            if (createdDepartment) {
                const updatedDepartments = await viewAllDepartments();
                console.log(`Added ${newDepartment} to the database`);
                console.table(updatedDepartments);
            }
            backToStart();
            break;
        // TODO
        case "Add a role":
            // array of department objects
            const updateDepartmentsView = await viewAllDepartments();
            // array of all departments
            const departmentChoices = updateDepartmentsView.map(
                (department) => ({
                    name: department.name,
                    value: department.id,
                })
            );

            const { newRole, newSalary, assignedDepartment } = await prompt([
                {
                    type: "input",
                    name: "newRole",
                    message:
                        "What is the NAME of the new role you would like to add?",
                },
                {
                    type: "number",
                    name: "newSalary",
                    message:
                        "What is the SALARY of the new role you would like to add?",
                },
                {
                    type: "list",
                    name: "assignedDepartment",
                    message: "Which department does this new role belong to?",
                    choices: departmentChoices,
                },
            ]);

            const newRoleAdded = await addRole(
                newRole,
                newSalary,
                assignedDepartment
            );

            if (newRoleAdded) {
                const updatedRoles = await viewAllRoles();
                console.log(`Added ${newRole} to the database`);
                console.table(updatedRoles);
            }

            backToStart();
            break;
        case "Add an employee":
            // array of role objects
            const addRolesView = await viewAllRoles();
            // array of all roles
            const addRoleNewEmployee = addRolesView.map((role) => ({
                name: role.title,
                value: role.id,
            }));
            // array of employee objects
            const addManagerView = await viewAllEmployees();
            // array of all employee
            const addManagerNewEmployee = addManagerView.map((role) => ({
                name: role["first name"] + " " + role["last name"],
                value: role["role ID"],
            }));
            // add no manager option
            addManagerNewEmployee.unshift({
                name: "** This Employee Does Not Have A Manager **",
                value: "NULL",
            });
            const { addFirst, addLast, addNewRole, addManager } = await prompt([
                {
                    type: "input",
                    name: "addFirst",
                    message: "What is the first name of the employee?",
                },
                {
                    type: "input",
                    name: "addLast",
                    message: "What is the last name of the employee?",
                },
                {
                    type: "list",
                    name: "addNewRole",
                    message: "What is their role?",
                    choices: addRoleNewEmployee,
                },
                {
                    type: "list",
                    name: "addManager",
                    message: "What is their Manager?",
                    choices: addManagerNewEmployee,
                },
            ]);

            // id & role_id, firstName, lastName, title, salary
            const newEmployee = await addEmployee(
                // capitalize first letter of names just in case
                capitalizeFirstLetter(addFirst),
                capitalizeFirstLetter(addLast),
                addNewRole,
                addManager
            );

            if (newEmployee) {
                const updatedEmployees = await viewAllEmployees();
                console.log(`Added ${addFirst} ${addLast} to the database`);
                console.table(updatedEmployees);
            }

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

            const newEmployeeRole = await updateRole(first, last, role);
            console.log(`Updated ${first} ${last}'s role.`);
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
    }
};

start();

// EXTRA TODOS:
// implement figlet
