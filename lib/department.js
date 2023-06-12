const mysql=require('mysql2');
const config=require('../config/config');
const Table=require('cli-table');
const Query=require('./queries');
const inquirer = require('inquirer');

class Department{
    constructor(){};
    // this function will display that contain the information about the department
    async displayAllDepartments(){
        const q='SELECT * FROM department';
        // make a connection to the database using the config obect which contain the connection details
        const db=mysql.createConnection(config);
        db.query(q,async (err,result)=>{
            if (err){
                console.log(err);
            }
            // creating the header of the result table
            const resultTable=new Table({
                head:['ID','Department Name']
            });
            // pushing the rows in the result table
            for (const row of result){
               resultTable.push([row.id, row.name]);
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
    // this function is add new department to the database
    addDerpartment(){
        // creating new object of the Query class
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
        //call the function addDepartment which is in the Query class to add the department
        query.addDepartment(Response.DepartmentName);
    });
    }
}
module.exports=Department;