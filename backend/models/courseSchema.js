const mongoose = require("mongoose");
const courseSchema = new mongoose.Schema({
  course_id: {
    type: String,
    unique: true,
    required: [true, "Enter the Course Code"],
  },
  // semester: {
  //   type: Number,
  //   required: true,
  // },
  name: {
    type: String,
    required: [true, "Please Enter the Course Name"],
  },
  // Teacher Assign is not much use off..
  teacherAssign: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Teacher",
      // required: true,
      default : null
    },
  ],
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
