import inquirer from "inquirer";
class Student {
    id;
    name;
    course_enroll;
    fees_amount;
    constructor(name, id, course_enroll, fees_amount) {
        this.id = id;
        this.name = name;
        this.course_enroll = [];
        this.fees_amount = fees_amount;
    }
}
let based_id = 10000;
let student_id = "";
let continueEnrollment = true;
let students = [];
do {
    let action = await inquirer.prompt({
        type: "list",
        name: "ans",
        message: "please select an option:\n",
        choices: ["Enroll a student", "show a student status"]
    });
    if (action.ans === "Enroll a student") {
        let Studentname = await inquirer.prompt({
            type: "input",
            name: "ans",
            message: "Enter your name"
        });
        let trimmedStudentname = (Studentname.ans).trim().toLowerCase();
        let StudentnameCheck = students.map(obj => obj.name);
        if (StudentnameCheck.includes(trimmedStudentname) === false) {
            if (trimmedStudentname !== "") {
                based_id++;
                student_id = "STID" + based_id;
                console.log("\n\tyour account has been created");
                console.log(`welcome , ${trimmedStudentname}`);
                let cource = await inquirer.prompt({
                    type: "list",
                    name: "ans",
                    message: "please select a course",
                    choices: ["IT", "cooking", "English"]
                });
                let coursefees = 0;
                switch (cource.ans) {
                    case "IT":
                        coursefees = 5000;
                        break;
                    case "cooking":
                        coursefees = 500;
                        break;
                    case "English":
                        coursefees = 300;
                        break;
                }
                let courseconfirm = await inquirer.prompt({
                    type: "confirm",
                    name: "ans",
                    message: "do you want to enroll in this course"
                });
                if (courseconfirm.ans === true) {
                    let student = new Student(student_id, trimmedStudentname, cource.ans, coursefees);
                    students.push(student);
                    console.log("you have enroll in this course");
                }
                else {
                    console.log("invalid Name");
                }
            }
        }
        else {
            "this name is already exists";
        }
    }
    else if (action.ans === "show a student status") {
        if (students.length !== 0) {
            let StudentnameCheck = students.map(e => e.name);
            let selectedStudent = await inquirer.prompt({
                type: "list",
                name: "ans",
                message: "please select name",
                choices: StudentnameCheck
            });
            let foundStudent = students.find(student => student.name === selectedStudent.ans);
            console.log("student conformation");
            console.log(foundStudent);
            console.log("\n");
        }
        else {
            "record is empaty ";
        }
    }
    let userconfirm = await inquirer.prompt({
        type: "confirm",
        name: "ans",
        message: "do you want to continue"
    });
    if (userconfirm.ans === false) {
        continueEnrollment = false;
    }
} while (continueEnrollment);
