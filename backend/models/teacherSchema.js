const mongoose = require("mongoose");
const Course = require("./courseSchema");
const jsonwebToken = require("jsonwebtoken");
const teacherSchema = new mongoose.Schema(
  {
    staff_Id: {
      type: String,
      unique: true,
      required: [true, "Please Enter your Id"],
    },
    name: {
      type: String,
      required: [true, "Please Enter the Staff Name"],
    },
    isHodOfbranch: {
      type: Boolean,
      default: false,
    },
    // isHodOfbranch: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   // ref : 'Branch',
    //   validate: {
    //     validator: function(value) {
    //       if (value) {
    //         console.log("Hello");
    //         this.isHodOfbranch.branch_id = [
    //           {
    //             type : mongoose.Schema.Types.ObjectId,
    //             ref : 'Branch',
    //             required : true,
    //           }
    //         ]
    //         return;
    //       } else {
    //         this.isHodOfbranch = null;
    //         return;
    //       }
    //     },
    //   },
    // },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "staff",
    },
    branchTeach: [
      {
        branch_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Branch",
          unique: true,
          required: true,
        },
        courseTeach: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
            unique: true,
            required: true,
          },
        ],
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

teacherSchema.methods.gernateJWTtoken = function () {
  return jsonwebToken.sign({ user: this }, process.env.JWT_KEY, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

const Teacher = mongoose.model("Teacher", teacherSchema);

module.exports = Teacher;
