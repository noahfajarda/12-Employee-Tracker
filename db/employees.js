const db = require("./connection");

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

module.exports = { viewAllEmployees };
