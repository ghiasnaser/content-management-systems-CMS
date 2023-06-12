const mysql=require('mysql2');
const config=require('../config/config');
const Table=require('cli-table');
const Query=require('./queries');
const inquirer = require('inquirer');

class Role{
    constructor(){};
    // this function will display all the roles with the salary and department
    async displayAllRoles(){
         // creating new object of the Query class
        const query=new Query();
        const q='SELECT * FROM role';
        // make a connection to the database using the config obect which contain the connection details
        const db=mysql.createConnection(config);
        db.query(q,async (err,result)=>{
            if (err){
                console.log(err);
            }
            // creating the header of the result table
            const resultTable=new Table({
                head:['Job Title', 'Role ID', 'Department','Salary']
            });
            for (const row of result){
                // getting the department name using the department_id FOREIGN key
                const department=await query.getDepartment(row.department_id);
                // adding new row to the result table
               resultTable.push([row.title, row.id,department[0].name,row.salary]);
            };
            // clear the terminal screen
            process.stdout.write('\u001b[2J\u001b[0;0H');
            //  converts the resultTable object to its string representation
            const tableOutput = resultTable.toString();
            //The tableOutput is split into individual lines using the split('\n') method
            const tableLines = tableOutput.split('\n');
            // to create an offset
            const tablePadding = '    '; 
            // Add empty line for spacing
            console.log('\n'); 
            tableLines.forEach((line) => {
                //each line is printed with the specified padding using the tablePadding variable.
                console.log(tablePadding + line);
            });
            // Add empty line for spacing
            console.log('\n'); 
            console.log('\n');
            console.log('\n');
            console.log('\n');
            console.log('\n');
            console.log('\n');
            console.log('\n');
        });
    }
    // this function will add new Role to the database
    async addRole(){
        // creating new object of the Query class
        const query=new Query();
        // get list of department names as objects
        const choicesData=await query.getDepartmentList();
        // convert the array of abjects to array of strings
        const choices = choicesData.map(obj => obj.name);
        inquirer
    .prompt([
        {
            type: 'input',
            message: 'Please Enter the Role Name:',
            name: 'RoleName', 
        },
        {
            type: 'input',
            message: 'Please Enter the salary for this role:',
            name: 'RoleSalary', 
        },
        {
            type: 'list',
            message: 'To which department does this role belong? (Use arrow Keys)',
            name: 'Department', 
            choices: choices,
        }
    ])
    .then((Response)=>{
        // call the addRole function from the Query class to add the Role
        query.addRole(Response.RoleName,Response.RoleSalary,Response.Department);
    });
}
}
module.exports=Role;