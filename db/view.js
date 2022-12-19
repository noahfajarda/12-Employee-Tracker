const db = require("./connection");

async function viewAllRoles() {
    try {
        const roles =
            await // SELECT * FROM .... ==== show all available columns
            db.promise().query(
                `SELECT r.id
                , r.title
                , d.name AS department 
                , r.salary
                FROM role r
                    LEFT JOIN department d ON r.department_id = d.id
                ORDER BY id;`
            );
        return roles[0];
    } catch (err) {
        // show error if it occurs
        console.log(err);
    }
}
// first, last, title, dept
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
                `SELECT e.id
                , e.first_name
                , e.last_name
                , r.title
                , d.name AS department
                , r.salary
                , 
                    (SELECT CONCAT(first_name, " ", last_name) as count FROM employee WHERE id = e.manager_id) AS manager
                FROM employee e
                LEFT JOIN role r ON e.role_id = r.id
                LEFT JOIN department d ON r.department_id = d.id;`
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
                `SELECT employee.id "Employee ID", first_name, last_name, title, salary FROM employee LEFT JOIN role ON employee.role_id = role.id WHERE manager_id IS NULL`
            );
        return employees[0];
    } catch (err) {
        // show error if it occurs
        console.log(err);
    }
}

async function viewEmployeesByManagers(managerID) {
    try {
        const employees = await db
            .promise()
            // SELECT * FROM .... ==== show all available columns
            .query(
                `SELECT e.id "Employee ID"
                , e.first_name "First Name"
                , e.last_name "Last Name"
                , r.title "Role"
                , d.name "Department"
                FROM employee e
                    LEFT JOIN role r on e.role_id = r.id
                    LEFT JOIN department d ON r.department_id = d.id
                    WHERE e.manager_id = ${managerID}`
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
    viewEmployeesByManagers,
};
