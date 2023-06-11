const mysql=require('mysql2');
const config=require('../config/config');
const db=mysql.createConnection(config);
class Queries{
    constructor(){};
    getTitle(roleID) {
        return new Promise((resolve, reject) =>{
            db.query('SELECT title FROM role where id=?',roleID,(err,res)=>{
                if (err){
                    reject(err);
                }
                else{
                    resolve(res);
                };
                
            });
        });
    };

    getSalary(roleID) {
        return new Promise((resolve, reject) =>{
            db.query('SELECT salary FROM role where id=?',roleID,(err,res)=>{
                if (err){
                    reject(err);
                }
                else{
                    resolve(res);
                };
                
            });
        });
    };

    getDepartment(roleID) {
        return new Promise((resolve, reject) =>{
            db.query(`SELECT name FROM department 
                    where id=(SELECT department_id FROM role where id=?)`,roleID,(err,res)=>{
                if (err){
                    reject(err);
                }
                else{
                    resolve(res);
                };
                
            });
        });
    };

    getManager(managerID) {
        return new Promise((resolve, reject) =>{
            db.query('SELECT first_name , last_name FROM employee where id=?',managerID,(err,res)=>{
                if (err){
                    reject(err);
                }
                else{
                    resolve(res);
                };
                
            });
        });
    };
    getManager(){
        return new Promise((resolve, reject) =>{
            db.query('SELECT first_name, last_name FROM employee WHERE manager_id IS NULL',(err,res)=>{
                if (err){
                    reject(err);
                }
                else{
                    resolve(res);
                };
                
            });
        });
    };
    getRoles() {
        return new Promise((resolve, reject) =>{
            db.query('SELECT title FROM role',(err,res)=>{
                if (err){
                    reject(err);
                }
                else{
                    resolve(res);
                };
                
            });
        });
    };
    addEmployee(first_name, last_name, role_title, manager_name) {
        db.query(
            `INSERT INTO employee (first_name, last_name, role_id, manager_id)
             SELECT ?, ?, r.id, m.id
             FROM role r
             LEFT JOIN employee m ON CONCAT(m.first_name, ' ', m.last_name) = ?
             WHERE r.title = ?`,
            [first_name, last_name, manager_name !== 'None' ? manager_name : null, role_title],
            (err, results) => {
              if (err) {
                console.error(err);
                return;
              }
              
              const insertedEmployeeId = results.insertId || results[0].insertId;
              console.log('Employee added successfully!');
              console.log('Inserted employee ID:', insertedEmployeeId);
            }
          );
          
    };
    gitDepartment(departmentID){
        return new Promise((resolve, reject) =>{
            db.query(`SELECT name FROM department WHERE id=?`,departmentID,(err,res)=>{
                if (err){
                    reject(err);
                }
                else{
                    resolve(res);
                };
                
            });
        });
    };
    addDepartment(department_name) {
        db.query(
          `INSERT INTO department (name)
           VALUES(?)`,[department_name],(err, results) => {
            if (err) {
              console.error(err);
              return;
            }
            const insertedDepartmentId = results.insertId || results[0].insertId;
            console.log('Department added successfully!');
            console.log('Inserted department ID:', insertedDepartmentId);
          }
        );
      };
      getDepartmentList() {
        return new Promise((resolve, reject) =>{
            db.query('SELECT name FROM department',(err,res)=>{
                if (err){
                    reject(err);
                }
                else{
                    resolve(res);
                };
                
            });
        });
    };
    addRole(Role_name,Role_salary,department_name) {
        db.query(
            `INSERT INTO role (title, salary, department_id)
            SELECT ?, ?, id FROM department WHERE name = ?`,[Role_name,Role_salary,department_name],(err, results) => {
            if (err) {
              console.error(err);
              return;
            }
            const insertedRoleId = results.insertId || results[0].insertId;
            console.log('Role added successfully!');
            console.log('Inserted Role ID:', insertedRoleId);
          }
        );
    };
    getEmployeesList() {
        return new Promise((resolve, reject) =>{
            db.query('SELECT first_name,last_name FROM employee',(err,res)=>{
                if (err){
                    reject(err);
                }
                else{
                    resolve(res);
                };
                
            });
        });
    };
    updateEmployeeRole(Employee_name,new_role){
        db.query(
            `UPDATE employee 
             SET role_id = (SELECT id FROM role WHERE title = ?)
             WHERE CONCAT(first_name, ' ', last_name) = ?`,[new_role,Employee_name],(err, results) => {
            if (err) {
              console.error(err);
              return;
            }
            console.log('Role updated successfully!');
            console.log('Affected rows:', results.affectedRows);
          }
        );
    };
}

module.exports=Queries;