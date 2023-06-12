const mysql=require('mysql2');
const config=require('../config/config');
const Table=require('cli-table');
const Query=require('./queries');
const inquirer = require('inquirer');

class Employee{
    constructor(){
    }
    // This function will display a table contain all the information about the employees
    async displayAllEmployees(){
        // creating new object of the Query class
        const query=new Query();
        const q='SELECT * FROM employee';
        // make a connection to the database using the config obect which contain the connection details
        const db=mysql.createConnection(config);
        db.query(q,async(err,result)=>{
            if (err){
                console.log(err);
            }
            // creating the header of the result table
            const resultTable=new Table({
                head:['ID','First Name','Last Name','Title','Department','Salary','Manager'],
                colWidths: [5, 15, 15, 25, 15, 10, 15]
            });
            for (const row of result){
                // call getTitle function from Query class to get the title using the role_id
                const title=await query.getTitle(row.role_id);
                // call getSalary function from Query class to get the salary using the role id
                const salary=await query.getSalary(row.role_id);
                // call the getDepartment function from Query class to get the department using the role id
                const department=await query.getDepartment(row.role_id);
                var managerName='';
                // if the manager column contain Null then we assign NULL to the manager name
                if (!row.manager_id){
                    managerName='NULL';
                }
                else{
                    // call getManager function fromQuery class to get the manager name object (first & last name)
                    var manager=await query.getManager(row.manager_id);
                    // managerName is a variable that holds the concatenated full name of the manager
                    managerName=(manager[0].first_name+' '+manager[0].last_name);
                }
                // pushing new row in the result table
               resultTable.push([row.id, row.first_name , row.last_name , title[0].title ,department[0].name , salary[0].salary,managerName]);
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
    // this function will add new employee to the database
    async addEmployee(){
        // creating new object of the Query class
        const query=new Query();
        // get list of Roles names as objects
        const choicesData=await query.getRoles();
        // convert the array of Roles abjects to array of strings
        const choices = choicesData.map(obj => obj.title);
        // get list of Managers names as objects
        const managersData=await query.getManager();
        // convert the array of abjects to array of strings
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
            // call addEmployee function from Query class to add new employee to database
            query.addEmployee(Response.FirstName,Response.LastName,Response.Role,Response.manager);
        });
    }
    // this function will update the Role of an existing employee
    async updateEmployeeRole(){
        // creating new object of the Query class
        const query=new Query();
        // get list of Employees names as objects
        const employeesData = await query.getEmployeesList();
        // convert the array of abjects to array of strings
        const employees = employeesData.map(obj => `${obj.first_name} ${obj.last_name}`);
        // get list of Roles names as objects
        const rolesData = await query.getRoles();
        // convert the array of abjects to array of strings
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
                //call the updateEmployeeRole Function from Query class to update the Role
                query.updateEmployeeRole(Response.Employee,Response.role)
            })
    }
 }
 module.exports=Employee;