const mongoose = require("mongoose");
const branchSchema = new mongoose.Schema(
  {
    branch_id: {
      type: String,
      unique: true,
      required: true,
    },
    semester : {
      type:Number,
      required:true
    },
    name: {
      type: String,
      required: [true, "Please Enter the Branch Name"],
    },
    hod: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Teacher',
      // required: true,
      // default : null
    },
    courses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        default: null,
        // required : [true,"Please Enter the Course Name"]
      },
    ],
    totalStudent : {
      type : Number,
      default : 0,
    }
    // createdAt: {
    //   type: Date,
    //   default: Date.now,
    // },
  },
  // { timestamps: true }
);

const Branch = mongoose.model("Branch", branchSchema);
module.exports = Branch;
