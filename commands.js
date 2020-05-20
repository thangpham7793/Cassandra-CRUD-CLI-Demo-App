#!/usr/bin/env node

// NOTE: the line above allow the program to run in Node

// NOTE: add arguments parsing based on user input in node
const program = require("commander");

// NOTE: add interactivity using inquirer
const { prompt } = require("inquirer");

// NOTE: import queries
const { findByName, findAllStudents, addStudent } = require("./index");

// NOTE: queries questions (can add branching later and include some navigation like "return to main menu")

// NOTE: questions' name should match the model's prop names, or the function/query won't run
const questions = [
  {
    type: "input",
    name: "firstName",
    message: "Enter Student First Name: ",
  },
  {
    type: "input",
    name: "lastName",
    message: "Enter Student Last Name: ",
  },
  {
    type: "input",
    name: "courses",
    message: "Enter Student Courses: ",
  },
  {
    type: "input",
    name: "ownedDocuments",
    message: "Enter Number of Documents Authored by this Student: ",
  },
  {
    type: "input",
    name: "numberOfComments",
    message: "Enter Number of Comments this Student has made: ",
  },
];

const findByNameQ = [
  {
    type: "input",
    name: "name",
    message: "Enter the name of the student you wish to find: ",
  },
];

//TODO: ADD SOME BASIC INFO AND MAYBE CREDITS LATER :D
program
  .version("1.0.0")
  .description(`🥮🎂 InstantStat Cassandra Piece of Cake 🎂🥮`);

// ANCHOR: ADD A STUDENT (not really the focus since executing queries are READ rather than CREATE operation)

// NOTE: add without inquirer.js
// program
//   .command(
//     "add <firstName> <lastName> <courses> <ownedDocuments> <numberOfComments>"
//   )
//   .alias("a")
//   .description("add a new student to the database")
//   .action((firstName, lastName, courses, ownedDocuments, numberOfComments) => {
//     addStudent({
//       firstName,
//       lastName,
//       courses,
//       ownedDocuments,
//       numberOfComments,
//     });
//   });

// test data:
// node commands.js add Thang Pham "Studio Project 1" 10 70
// node commands.js add Rory Davies "Studio Project 1" 18 30
// node commands.js add Georgie Northcoat "Studio Project 1" 25 120
// node commands.js add Rodney Tamblyn "Ocean Browser" 6 30
// node commands.js add Gloria Gomez "Effective Online Learning" 5 100

// ANCHOR: add with inquirer.js (users supply input through answering questions)
program
  .command("add")
  .alias("a")
  .description("add a new student to the database")
  .action(() => {
    prompt(questions).then((answers) => {
      console.log(answers); //returns an object
      addStudent(answers);
    });
  });

// ANCHOR: FIND BY NAME
program
  .command("find-by-name")
  .alias("fbn")
  .description("find a student by name")
  .action(() => {
    prompt(findByNameQ).then((answer) => {
      findByName(answer.name);
    });
  });

// ANCHOR: FIND ALL (no argument needed, so the command simply run it, could've asked a question still)
program
  .command("find-all")
  .alias("f")
  .description("find all students")
  .action(() => findAllStudents());

// ANCHOR: actually run the program/ parse(process.argv) means 'reading user input from node'
program.parse(process.argv);
