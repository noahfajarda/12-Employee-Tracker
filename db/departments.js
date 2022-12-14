const db = require("./connection");

async function viewAllDepartments() {
    try {
        const departments = await db
            .promise()
            .query(`SELECT * from department`);
        return departments[0];
    } catch (err) {
        // show error if it occurs
        console.log(err);
    }
}

module.exports = { viewAllDepartments };
