const mongoose = require("mongoose");
const jsonwebToken = require("jsonwebtoken");
const { options } = require("../routes/studentRoutes");

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter the Student Name"],
    },
    rollNo: {
      type: Number,
      required: [true, "Please Enter Roll Number"],
      unique: true,
    },
    fatherName: {
      type: String,
      required: [true, "Please Enter your Father Name"],
    },
    studentNumber : {
      type : Number,
      required : true
      // min : [6 , "number cannot be less than 10"],
      // max : [11 , "number cannot be more than 10"]
    },
    parentsNumber : {
      type : Number,
      required : true
      // min : [6 , "number cannot be less than 10"],
      // max : [11 , "number cannot be more than 10"]
    },
    branchName: {
      // type: String,
      type : mongoose.Schema.Types.ObjectId,
      ref : 'Branch',
      required : true,
      // default : null
    },
    password: {
      type: String,
      select:false,
      required: true,
    },
    role: {
      type: String,
      default: "student",
    },
    email : {
      type : String,
      required : true
    }
    // createdAt: {
    //   type: Date,
    //   default: Date.now,
    // },
    //   resetPasswordToken: String,
    //   resetPasswordExpire: Date,
  },
  // { timestamps: true }
);

/* Create Json web Token */
studentSchema.methods.gernateJWTtoken = function(){
  return jsonwebToken.sign({user :  this},process.env.JWT_KEY,{
    expiresIn : process.env.JWT_EXPIRE 
  })
}

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
