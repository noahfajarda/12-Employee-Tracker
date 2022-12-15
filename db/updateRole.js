const db = require("./connection");

async function updateRole(employeeFirst, employeeLast, newRoleID) {
    try {
        const roles = await db
            .promise()
            // SELECT * FROM .... ==== show all available columns
            .query(
                `UPDATE employee SET role_id = ? WHERE first_name = ? AND last_name = ?`,
                [newRoleID, employeeFirst, employeeLast]
            );
        return roles[0];
    } catch (err) {
        // show error if it occurs
        // change color of error, chalk
        console.log(err.sqlMessage, "\n");
    }
}

module.exports = { updateRole };
