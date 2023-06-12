const inquirer = require('inquirer');
const employee=require('./lib/employee');
const department=require('./lib/department');
const role=require('./lib/role');

function startPrompt(){
    console.clear();
    inquirer.prompt([
            {
                type: 'list',
                message: 'what would you like to do? (Use arrow Keys)',
                name: 'action', 
                pageSize: 10,
                choices: [
                    'View All Departments',
                    'View All Roles',
                    'View All Employees',
                    'Add a Department',
                    'Add a Role',
                    'Add an Employee',
                    'Update an Employee Role',
                    new inquirer.Separator(),
                    '',
                    ''
                ],
            },
    ])
    .then(async (Response)=>{
        var employees = new employee();
        var departments = new department();
        var roles = new role();
        switch (Response.action){
            case 'View All Employees':
                await employees.displayAllEmployees();
                startPrompt();
                break;
            case 'Add an Employee':
                await employees.addEmployee();
                break;
            case 'View All Departments':
                await departments.displayAllDepartments();
                startPrompt();
                break;
            case 'View All Roles':
                await roles.displayAllRoles();
                startPrompt();
                break;
            case 'Add a Department':
                await departments.addDerpartment();
                break;
            case 'Add a Role':
                await roles.addRole();
                break;
            case 'Update an Employee Role':
                await employees.updateEmployeeRole();
                break;
        }
    });
}
startPrompt();


