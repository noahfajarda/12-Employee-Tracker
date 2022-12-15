const db = require("./connection");

async function viewAllRoles() {
    try {
        const roles = await db
            .promise()
            // SELECT * FROM .... ==== show all available columns
            .query(`SELECT * FROM role ORDER BY id`);
        return roles[0];
    } catch (err) {
        // show error if it occurs
        console.log(err);
    }
}

async function viewAllDepartments() {
    try {
        const departments = await db
            .promise()
            .query(`SELECT * FROM department ORDER BY id`);
        return departments[0];
    } catch (err) {
        // show error if it occurs
        console.log(err);
    }
}

async function viewAllEmployees() {
    try {
        const employees = await db
            .promise()
            // SELECT * FROM .... ==== show all available columns
            .query(
                `SELECT * FROM employee LEFT JOIN role ON employee.role_id = role.id`
            );
        return employees[0];
    } catch (err) {
        // show error if it occurs
        console.log(err);
    }
}

async function viewManagers() {
    try {
        const employees = await db
            .promise()
            // SELECT * FROM .... ==== show all available columns
            .query(
                `SELECT manager_id, first_name, last_name, manager_id, title, salary FROM employee LEFT JOIN role ON employee.role_id = role.id WHERE manager_id != 'null'`
            );
        return employees[0];
    } catch (err) {
        // show error if it occurs
        console.log(err);
    }
}

module.exports = {
    viewAllRoles,
    viewAllDepartments,
    viewAllEmployees,
    viewManagers,
};
