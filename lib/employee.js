const mysql=require('mysql2');
const config=require('../config/config');
const Table=require('cli-table');
const Query=require('./queries');
const inquirer = require('inquirer');

class Employee{
    constructor(){
    }
    
    async displayAllEmployees(){
        const query=new Query();
        const q='SELECT * FROM employee';
        const db=mysql.createConnection(config);
        db.query(q,async(err,result)=>{
            if (err){
                console.log(err);
            }
            const resultTable=new Table({
                head:['ID','First Name','Last Name','Title','Department','Salary','Manager'],
                colWidths: [5, 15, 15, 25, 15, 10, 15]
            });
            for (const row of result){
                const title=await query.getTitle(row.role_id);
                const salary=await query.getSalary(row.role_id);
                const department=await query.getDepartment(row.role_id);
                var managerName='';
                if (!row.manager_id){
                    managerName='NULL';
                }
                else{
                    var manager=await query.getManager(row.manager_id);
                    managerName=(manager[0].first_name+' '+manager[0].last_name);
                }
               resultTable.push([row.id, row.first_name , row.last_name , title[0].title ,department[0].name , salary[0].salary,managerName]);
                
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

    async addEmployee(){
        const db=mysql.createConnection(config);
        const query=new Query();
        const choicesData=await query.getRoles();
        const choices = choicesData.map(obj => obj.title);
        const managersData=await query.getManager();
        const managers = managersData.map(obj => (obj.first_name+' '+obj.last_name));
        managers.push('None');
        inquirer
            .prompt([
                {
                    type: 'input',
                    message: 'Please Enter the First Name of the employee:',
                    name: 'FirstName', 
                },
                {
                    type: 'input',
                    message: 'Please Enter the Last Name of the employee:',
                    name: 'LastName', 
                },
                {
                    type: 'list',
                    message: 'what is the employee Role? (Use arrow Keys)',
                    name: 'Role', 
                    choices: choices,
                },
                {
                    type: 'list',
                    message: 'how is the employee manager? (Use arrow Keys)',
                    name: 'manager', 
                    choices: managers,
                }
            ])
        .then((Response)=>{
            query.addEmployee(Response.FirstName,Response.LastName,Response.Role,Response.manager);
        });
    }

    async updateEmployeeRole(){
        const db=mysql.createConnection(config);
        const query=new Query();
        const employeesData = await query.getEmployeesList();
        const employees = employeesData.map(obj => `${obj.first_name} ${obj.last_name}`);
        const rolesData = await query.getRoles();
        const roles = rolesData.map(obj => obj.title);
        inquirer
            .prompt([
                {
                    type: 'list',
                    message: 'Which employee would you like to change the role for? (Use arrow Keys)',
                    name: 'Employee', 
                    choices: employees,
                },
                {
                    type: 'list',
                    message: 'What is the new Role that you want to assign for this emplyee? (Use arrow Keys)',
                    name: 'role', 
                    choices: roles,
                }
            ])
            .then((Response)=>{
                query.updateEmployeeRole(Response.Employee,Response.role)
            })
    }
 }
 module.exports=Employee;