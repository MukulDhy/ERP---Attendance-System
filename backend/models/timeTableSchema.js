const mongoose = require("mongoose");

const timeTableSchema = mongoose.Schema({
  branch_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref : 'Branch',
    required: [true, "Please Enter Branch Id"],
  },
  monday: [
    {
      period : {
        type : Number,
        required : true,
      },
      teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher",
        required: true,
      },
      // time: {
      //   type: Date.,
      //   required: true,
      // },
      course_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        // required: true,
      },
    },
  ],
  tuesday: [
    {
      period : {
        type : Number,
        required : true,
      },
      teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher",
        required: true,
      },
      // time: {
      //   type: Date,
      //   required: true,
      // },
      course_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        // required: true,
      },
    },
  ],
  wednesday: [
    {
      period : {
        type : Number,
        required : true,
      },
      teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher",
        required: true,
      },
      // time: {
      //   type: Date,
      //   required: true,
      // },
      course_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        // required: true,
      },
    },
  ],
  thursday: [
    {
      period : {
        type : Number,
        required : true,
      },
      teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher",
        required: true,
      },
      // time: {
      //   type: Date,
      //   required: true,
      // },
      course_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        // required: true,
      },
    },
  ],
  friday: [
    {
      period : {
        type : Number,
        required : true,
      },
      teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher",
        required: true,
      },
      // time: {
      //   type: Date,
      //   required: true,
      // },
      course_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        
        // required: true,
      },
    },
  ],
  saturday: [
    {
      period : {
        type : Number,
        required : true,
      },
      teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher",
        default: null,
      },
      // time: {
      //   type: Date,
      //   default: null,
      // },
      course_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        default: null,
      },
    },
  ],
});

const TimeTable = mongoose.model("TimeTable", timeTableSchema);

module.exports = TimeTable;
