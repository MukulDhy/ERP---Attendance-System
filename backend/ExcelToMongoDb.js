const mongoose = require("mongoose");
// const students = require("./data/orgData/");
// const teachers = require("./data/teacherData");
const courses = require("./data/orgData/courseData");
// const branchs = require("./data/branchData");
// const attendance = require("./data/attandeneData");
require("colors");
const Student = require("./models/studentModel");
const Teacher = require("./models/teacherSchema");
const Course = require("./models/courseSchema");
const Branch = require("./models/branchModel");
const Attendence = require('./models/attendenceSchema');
const dotenv = require("dotenv");
const connectionMongoDb = require("./database/connDataBase");

dotenv.config({ path: "backend/config/config.env" });

connectionMongoDb();

const importData = async () => {
  try {
    // await Attendence.deleteMany();
    // await Student.deleteMany();
    // await Teacher.deleteMany();
    await Course.deleteMany();
    // await Branch.deleteMany();
    
    // await Attendence.insertMany(attendance);
    // await Student.insertMany(students);
    // await Teacher.insertMany(teachers);
    await Course.insertMany(courses);
    // await Branch.insertMany(branchs);

    console.log("Data Imported".green.inverse.bgMagenta);
    process.exit();
  } catch (error) {
    console.log(`Errors while Importing : ${error}`.red.inverse.bgGreen);
    process.exit(1);
  }
};

const dataDestroy = async (err) => {
  // await Student.deleteMany();
  await Attendence.deleteMany();
  if (err) {
    console.log(`Errors : ${err}`.red.inverse.bgGreen);
  }
  console.log("Data Destroy".green);
  process.exit();
};

if (process.argv[2] === "-d") {
  dataDestroy();
} else {
  importData();
}
