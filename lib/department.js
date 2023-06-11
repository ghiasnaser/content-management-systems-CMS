const mysql=require('mysql2');
const config=require('../config/config');
const Table=require('cli-table');
const Query=require('./queries');
const inquirer = require('inquirer');

class Department{
    constructor(){};
    async displayAllDepartments(){
        const query=new Query();
        const q='SELECT * FROM department';
        const db=mysql.createConnection(config);
        db.query(q,async (err,result)=>{
            if (err){
                console.log(err);
            }
            const resultTable=new Table({
                head:['ID','Department Name']
            });
            for (const row of result){
                
               resultTable.push([row.id, row.name]);
                
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
           
        });
    }
    addDerpartment(){
        const db=mysql.createConnection(config);
        const query=new Query();
        inquirer
    .prompt([
        {
            type: 'input',
            message: 'Please Enter the Department Name:',
            name: 'DepartmentName', 
        }
    ])
    .then((Response)=>{
        query.addDepartment(Response.DepartmentName);
    });
    }
}
module.exports=Department;