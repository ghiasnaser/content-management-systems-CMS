INSERT INTO department (name)
VALUES ("Sales"),
       ("Service"),
       ("Finance"),
       ("Engineering"),
       ("Legal");

INSERT INTO role (title,salary,department_id)
VALUES ("Sales Representative",8000,1),
       ("Sales Lead",14000,1),
       ("Service Advisor",5000,2),
       ("Service Lead",8000,2),
       ("Account Manager",9000,3),
       ("Accountant",5000,3),
       ("Lead Engineer",12000,4),
       ("Software Engineer",10000,4),
       ("Legal Team Lead",10000,5),
       ("Lawyer",8000,5);

INSERT INTO employee (first_name,last_name,role_id,manager_id)
VALUES ("Liam","Johnson",2,NULL),
       ("Ava","Davis",1,1),
       ("Ethan","Wilson",4,NULL),
       ("Mia","Anderson",3,3),
       ("Noah","Thompson",5,NULL),
       ("Olivia","Garcia",6,5),
       ("Lucas","Martinez",7,NULL),
       ("Sophia","Robinson",8,7),
       ("Benjamin","Clark",9,NULL),
       ("Isabella","Wright",10,8);