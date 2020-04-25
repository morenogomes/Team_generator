const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");


const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


const teamGomes = [];
const gomesIds = [];

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
function applicationRun() {
    addManager();
}

function addManager() {
    console.log("Employee team.")
    inquirer.prompt([
        {
            type: "input",
            name: "manager_name",
            message: "What's the manager's name?",
            validate: answer => {
                if (answer !== "") {
                    return true;
                }
                return "Please enter a name.";
            }
        },
        {
            type: "input",
            name: "id",
            message: "What's the manager's id?",
            validate: answer => {
                if (answer !== "") {
                    return true;
                }
                return "Please enter id.";
            }
        },
        {
            type: "input",
            name: "email",
            message: "What's the manager's email?",
            validate: answer => {
                if (answer !== "") {
                    return true;
                }
                return "Please enter the email.";
            }
        },
        {
            type: "input",
            name: "managerOfficeNumber",
            message: "What's your office phone number?",
            validate: answer => {
                const pass = answer.match(
                    /^[1-9]\d*$/
                );
                if (pass) {
                    return true;
                }
                return "Please enter a positive number greater than zero.";
            }
        }

    ]).then(answers => {
        const manager = new Manager(answers.manager_name, answers.id, answers.email, answers.managerOfficeNumber);
        teamGomes.push(manager);
        gomesIds.push(answers.id);
        buildteam();
    });
    function buildteam() {
        inquirer.prompt([
            {
                type: "list",
                name: "employee_type",
                message: "What's your position?",
                choices: ["engineer", "intern", "Team complete"]
            }
        ]).then(choiceMade => {
            switch (choiceMade.employee_type) {
                case "engineer":
                    newEngineer();
                    break;
                case "intern":
                    newIntern();
                    break;
                default:
                    validTeam();
            }
        });
    }
    function newEngineer() {
        inquirer.prompt([
            {
                type: "input",
                name: "eng_name",
                message: "What's the engineer's name?",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter a name.";
                }
            },
            {
                type: "input",
                name: "eng_id",
                message: "What's the engineer's id?",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter a name.";
                }
            },
            {
                type: "input",
                name: "eng_email",
                message: "What's your engineer's email?",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter your email.";
                }
            },
            {
                type: "input",
                name: "eng_gitHub",
                message: "What's your GitHub user name?",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter your GitHub user name.";
                }
            }
        ]).then(answers => {
            const engineer = new Engineer(answers.eng_name, answers.eng_id, answers.eng_email, answers.eng_gitHub);
            teamGomes.push(engineer);
            gomesIds.push(answers.eng_id);
            buildteam();

        }
        )
    };
    function newIntern() {
        inquirer.prompt([
            {
                type: "input",
                name: "int_name",
                message: "What's the intern's name?",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter a name.";
                }
            },
            {
                type: "input",
                name: "int_id",
                message: "What's the intern's id?",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter a name.";
                }
            },
            {
                type: "input",
                name: "int_email",
                message: "What's your intern's email?",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter your email.";
                }
            },
            {
                type: "input",
                name: "int_school",
                message: "Where did you study?",
                default: "School name",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter your school.";
                }
            }
        ]).then(answers => {
            const intern = new Intern(answers.int_name, answers.int_id, answers.int_email, answers.int_school);
            teamGomes.push(intern);
            gomesIds.push(answers.int_id);
            buildteam();
        });

    }
    // render html, export all data tor htmlRender
    //terminate app.js
    function validTeam() {
        writeToFile(render(teamGomes), outputPath);
    };
};

applicationRun();

function ensureDirSync(dirpath) {
    try {
        return fs.mkdirSync(dirpath)
    } catch (err) {
        if (err.code !== 'EEXIST') throw err
    }
}

function writeToFile(data, fileName) {
    ensureDirSync(OUTPUT_DIR);

    return fs.writeFileSync(fileName, data);
    // console.log(`this is filename = ${fileName}`);
}