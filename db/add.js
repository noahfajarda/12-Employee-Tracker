const db = require("./connection");

async function addRole(newRole, newSalary, assignedDepartment) {
    try {
        const roles = await db
            .promise()
            // SELECT * FROM .... ==== show all available columns
            .query(
                `INSERT INTO role (title, salary, department_id) VALUES ('${newRole}', '${newSalary}', '${assignedDepartment}')`
            );
        return roles[0];
    } catch (err) {
        // show error if it occurs
        // change color of error, chalk
        console.log(err.sqlMessage, "\n");
    }
}

async function addDepartment(department) {
    try {
        const departments = await db
            .promise()
            // SELECT * FROM .... ==== show all available columns
            .query(`INSERT INTO department (name) VALUES ('${department}')`);
        return departments[0];
    } catch (err) {
        // show error if it occurs
        // change color of error, chalk
        console.log(err.sqlMessage, "\n");
    }
}

async function addEmployee(firstName, lastName, role_id, manager) {
    try {
        const employees = await db
            .promise()
            .query(
                `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${firstName}', '${lastName}', '${role_id}', '${manager}')`
            );
        return employees[0];
    } catch (err) {
        // show error if it occurs
        // change color of error, chalk
        console.log(err.sqlMessage, "\n");
    }
}

module.exports = { addRole, addDepartment, addEmployee };
