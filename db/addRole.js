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

module.exports = { addRole };
