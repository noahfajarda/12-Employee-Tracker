const db = require("./connection");

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

module.exports = { addDepartment };
