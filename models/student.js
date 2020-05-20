const mongoose = require("mongoose");

// ANCHOR: defining the schema (just like table in Oracle)
const studentSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  courses: String,
  ownedDocuments: Number,
  numberOfComments: Number,
});

// NOTE: pre-processing the search results
studentSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Student", studentSchema);
