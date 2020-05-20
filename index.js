const mongoose = require("mongoose");
const fs = require("fs");
const jsoncsv = require("json-csv");

const fields = [
  {
    name: "firstName",
    label: "First Name",
  },
  {
    name: "lastName",
    label: "Last Name",
  },
  {
    name: "courses",
    label: "Courses",
  },
  {
    name: "ownedDocuments",
    label: "Number of Owned Documents",
  },
  {
    name: "numberOfComments",
    label: "Number of Comments",
  },
  {
    name: "id",
    label: "id",
  },
];

// NOTE: use ISO since it accounts for seconds and make sure that all new files have different names. Replace dot and colon with '-' to avoid messing up the file extension.
const date = new Date().toISOString().replace(/[.:]/g, "-");

// NOTE: should use promise to avoid the CALLBACK pyramid...
const writeToFile = (results, operation) => {
  jsoncsv.buffered(
    results,
    {
      fields: fields,
    },
    (err, csv) => {
      if (err) throw err;
      fs.writeFile(
        __dirname + `/query-result/${operation}-${date}.csv`,
        csv,
        (err, result) => {
          if (err) throw err;
          console.log(
            `Successfully write result to ${__dirname}/query-result/${operation}-${date}.csv`
          );
        }
      );
    }
  );
};

// ANCHOR: import student model/blueprint

const Student = require("./models/Student");

// ANCHOR:  get the link and password for MongoDB
require("dotenv").config();
let TEST_MONGODB_URI =
  "mongodb+srv://tom77:QkebJtQ0vO7JDO9u@fullstack2020-yydnr.mongodb.net/ob3-test-database?retryWrites=true&w=majority";

// ANCHOR: connect to database (should embed this inside each function)
const db = mongoose
  .connect(TEST_MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((_result) => {
    return;
  })
  .catch((error) =>
    console.error(`error connecting to MongoDB: ${error.message}`)
  );

// ANCHOR: function to close the database
const disconnect = () => mongoose.connection.close();

// ANCHOR: add a student (create)

const addStudent = (student) => {
  Student.create(student).then((student) => {
    console.info("New Student Added", student.toJSON());
    disconnect();
  });
};

// ANCHOR: find all students
const findAllStudents = () => {
  Student.find({}).then((students) => {
    const cleanResults = students.map((student) => student.toJSON());
    writeToFile(students, "find-all-students");
    console.log("Here are all the students", cleanResults);
    disconnect();
  });
};

// ANCHOR: find student by NAME
const findByName = (name) => {
  // NOTE: ignore case (i = case-insensitive)
  const pattern = new RegExp(name, "i");
  Student.find({ $or: [{ firstName: pattern }, { lastName: pattern }] }).then(
    (students) => {
      writeToFile(students, `find-by-name-${name}`);
      const cleanResults = students.map((student) => student.toJSON());
      console.info("Found", cleanResults);
      console.info(`Found ${students.length} matches`);

      // NOTE:  We may also add like a small report or write the queried stats to a local file here!
      console.info(
        `We may also add like a small report or write the queried stats to a local file here!`
      );
      disconnect();
    }
  );
};

module.exports = {
  findByName,
  findAllStudents,
  addStudent,
};

// NOTE: credit goes to TraversyMedia
// based on his tutorial at:
// https://www.youtube.com/watch?v=v2GKt39-LPA
