const { prompt } = require("inquirer");
const db = require("./db/connection");
const {
    viewAllDepartments,
    viewAllRoles,
    viewAllEmployees,
    viewManagers,
} = require("./db/view");
const { addDepartment } = require("./db/addDepartment");
const { addRole } = require("./db/addRole");
const { addEmployee } = require("./db/addEmployee");
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
                "View managers",
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
        case "View managers":
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
            // console.log(createdDepartment.affectedRows);

            if (createdDepartment) {
                const updatedDepartments = await viewAllDepartments();
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
            console.log(newRoleAdded);

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
                name: role.first_name + " " + role.last_name,
                value: role.id,
            }));
            // add no manager option
            addManagerNewEmployee.unshift({
                name: "** This Employee Does Not Have A Manager **",
                value: "NULL",
            });
            const { addFirst, addLast, addRole, addManager } = await prompt([
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
                    name: "addRole",
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
                addFirst,
                addLast,
                addRole,
                addManager
            );

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
            console.log(newEmployeeRole);
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
// show a list of managers/employees
