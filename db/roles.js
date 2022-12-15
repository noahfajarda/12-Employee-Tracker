const db = require("./connection");

async function viewAllRoles() {
    try {
        const roles = await db
            .promise()
            // SELECT * FROM .... ==== show all available columns
            .query(`SELECT * FROM role`);
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
            .query(`SELECT * from department`);
        return departments[0];
    } catch (err) {
        // show error if it occurs
        console.log(err);
    }
}

module.exports = { viewAllRoles, viewAllDepartments };
