const Intern= require("./intern")
const Engineer= require("./engineer")
const Manager= require("./manager")
const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');

// create writeFile function using promises instead of a callback function
const writeFileAsync = util.promisify(fs.writeFile);


const teamm=[];


class Team{
   
    start(){
        this.createManager();
    }

    after(){
        inquirer
            .prompt([
            {
            name: "add",
            type: "confirm",
            message:"would you like to add more members?",
            }
        ])
        .then((answers) => {
            if(answers.add){
                inquirer.prompt([{ 
                    type: "list",
                    name: "choice",
                    message: "What member would you like to add?",
                    choices: ["Engineer","Intern"],
                }]).then((answer) => {
                    if(answer.choice=="Intern"){
                       team1.createIntern();
                    } else {
                       team1.createEngineer();
                    }
                });
            }else{
                console.log("Here's your team!")
                console.log(teamm);
               
               
                console.log(teamm);
                writeFileAsync('index.html', generateHTML(teamm));
                //generate html method
            }
        })
    }

    
    createManager(){
        inquirer
         .prompt([
            {
                type: "input",
                name: "name",
                message:"managers name?",
            },
            {
                type: "input",
                name: "id",
                message:"managers id?"
            },
            {
                type: "input",
                name: "email",
                message:"managers email?"
            },
            {
                type: "input",
                name: "office",
                message:"managers office #?"
            }
         ])
         .then(answers => {
           const m = new Manager(answers.name, answers.id,answers.email,answers.office)
           teamm.push(m);
           this.after();
           
          });
    }

    createEngineer(){
        inquirer
         .prompt([
            {
                type: "input",
                name: "name",
                message:"engineers name?",
            },
            {
                type: "input",
                name: "id",
                message:"engineers id?"
            },
            {
                type: "input",
                name: "email",
                message:"engineers email?"
            },
            {
                type: "input",
                name: "github",
                message:"engineers github?"
            }
         ])
         .then(answers => {
           const e = new Engineer(answers.name, answers.id,answers.email,answers.github)
           teamm.push(e);
           this.after();
          
          });
    }

    createIntern(){
        inquirer
         .prompt([
            {
                type: "input",
                name: "name",
                message:"interns name?",
            },
            {
                type: "input",
                name: "id",
                message:"interns id?"
            },
            {
                type: "input",
                name: "email",
                message:"interns email?"
            },
            {
                type: "input",
                name: "school",
                message:"interns school?"
            }
         ])
         .then(answers => {
           const i = new Intern(answers.name, answers.id,answers.email,answers.school)
           teamm.push(i);
           this.after();
          });
    }
}



const generateHTML=(teamm) =>

`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
  <title>Document</title>
</head>
<body>
  <div class="jumbotron jumbotron-fluid">
  <div class="container">
    <h3>Example heading <span class="badge badge-secondary">Contact Me</span></h3>
    <ul class="list-group">
    
       
    <li class="list-group-item">Member ${teamm}</li>

      
    </ul>
  </div>
</div>
</body>
</html>`;


const team1 = new Team();
team1.start();
module.exports=Team;