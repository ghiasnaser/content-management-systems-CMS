const mysql=require('mysql2');
const config=require('../config/config');
const Table=require('cli-table');
const Query=require('./queries');
const inquirer = require('inquirer');

class Role{
    constructor(){};
    async displayAllRoles(){
        const query=new Query();
        const q='SELECT * FROM role';
        const db=mysql.createConnection(config);
        db.query(q,async (err,result)=>{
            if (err){
                console.log(err);
            }
            const resultTable=new Table({
                head:['Job Title', 'Role ID', 'Department','Salary']
            });
            for (const row of result){
                const department=await query.getDepartment(row.department_id);
               resultTable.push([row.title, row.id,department[0].name,row.salary]);
                
            };
             //console.log(resultTable.toString());
             process.stdout.write('\u001b[2J\u001b[0;0H');
            const tableOutput = resultTable.toString();
            const tableLines = tableOutput.split('\n');//The tableOutput is split into individual lines using the split('\n') method
            const tablePadding = '    '; // to create an offset
            console.log('\n'); // Add empty line for spacing
            tableLines.forEach((line) => {
                console.log(tablePadding + line);//ach line is printed with the specified padding using the tablePadding variable.
            });
            console.log('\n'); // Add empty line for spacing
            console.log('\n');
            console.log('\n');
            console.log('\n');
            console.log('\n');
            console.log('\n');
            console.log('\n');
           
      
            //resolve();
        });
    }
    async addRole(){
        const db=mysql.createConnection(config);
        const query=new Query();
        const choicesData=await query.getDepartmentList();
        console.log(choicesData);
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
        query.addRole(Response.RoleName,Response.RoleSalary,Response.Department);
    });
}
}
module.exports=Role;