const db = require("./connection");

async function addEmployee(firstName, lastName, role_id, manager) {
    console.log(firstName, lastName, role_id, manager);
    console.log(role_id);

    try {
        const employees = await db
            .promise()
            .query(
                `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${firstName}', '${lastName}', '${role_id}', '${manager}')`
            );
        console.log(employees[0]);
        return employees[0];
    } catch (err) {
        // show error if it occurs
        // change color of error, chalk
        console.log(err.sqlMessage, "\n");
    }
}

module.exports = { addEmployee };
