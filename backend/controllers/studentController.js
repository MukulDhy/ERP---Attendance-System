const catchAsyncError = require("../middlewares/catchAsyncError");
const Student = require("../models/studentModel");
const Attandance = require("../models/attendenceSchema");
const ErrorHandler = require("../utils/ErrorHandler");
const ApiFeatures = require("../utils/ApiFeaturs");
const gernateJWTtoken = require("../utils/sendJWTToken");
const { startSession } = require("../models/studentModel");
const Branch = require("../models/branchModel");
const { populate } = require("../models/attendenceSchema");
const AttendanceApi = require("../utils/AttendanceApi");

/* Get All Student  -- TeacherRoute and Admin */
const getStudent = catchAsyncError(async (req, res) => {
  const apiFeatures = new ApiFeatures(Student.find(), req.query)
    .search()
    .searchBranch();

  const students = await apiFeatures.query
    .populate("branchName", "name branch_id")
    .select(["-role", "-createdAt", "-updatedAt", "-__v", ""]);

  // const students = await apiFeatures.query.populate({path : 'branchName',select : 'name' , populate : { path : 'courses', select : "name" , model : 'Course' } })

  res.status(200).json({
    students,
  });
});

/* new Student Create  -- Admin Routes */
const createStudents = catchAsyncError(async (req, res, next) => {
  // console.log(req.body);
  let rollNo = req.body.rollNo;

  const studentExist = await Student.findOne({ rollNo });

  if (studentExist) {
    return next(new ErrorHandler("Student Already Exist", 400));
  }

  const branch = await Branch.findOne({
    name: { $regex: new RegExp("^" + req.body.branchName.toUpperCase(), "i") },
  });

  const student = await Student.create({ ...req.body, branchName: branch._id });

  branch.totalStudent = branch.totalStudent + 1;
  // await Branch.findByIdAndUpdate(branch._id,{totalStudent : branch.totalStudent + 1},{new : true,runValidators :true});
  branch.save();
  const token = student.gernateJWTtoken();

  res.status(200).json({
    success: true,
    student,
    token,
  });
});

/* Login Student */

const loginStudent = catchAsyncError(async (req, res, next) => {
  const { rollNo } = req.body;
  // console.log(req.body);
  const student = await Student.findOne({ rollNo })
    .select("+password")
    .populate([
      {
        path: "branchName",
        select: ["name", "hod"],
        populate: [
          { path: "courses", select: "name" },
          { path: "hod", select: "name" },
        ],
      },
    ]);

  if (!student) {
    return next(new ErrorHandler("Student Does Not Exist", 404));
  }

  if (student.password !== req.body.password) {
    return next(new ErrorHandler("Password is Invalid", 401));
  }

  gernateJWTtoken(student, 200, res);
});

/* Get Single Student --Student Route */
const getSingleStudent = catchAsyncError(async (req, res, next) => {
  const student = await Student.findById(req.params.id).populate([
    {
      path: "branchName",
      select: ["name", "hod"],
      populate: [
        { path: "courses", select: "name" },
        { path: "hod", select: "name" },
      ],
    },
  ]);
  if (!student) {
    return next(new ErrorHandler("Student Not FOund", 404));
  }

  res.status(200).json({
    success: true,
    student,
  });
});

/* Get Student Profile */
const getUserProfile = catchAsyncError(async (req, res, next) => {
  // console.log(req.user);
  const user = req.user;

  res.status(200).json({
    success: true,
    user,
  });
});

/* LogOut Student */
const logOut = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, { expires: new Date(Date.now()), httpOnly: true });
  res.status(200).json({
    success: true,
    message: "LogOut SuccessFully",
  });
});

/* Update Student Profile */
const updateStudent = catchAsyncError(async (req, res, next) => {
  const updatedDetails = {
    ...req.user,
    ...req.body,
  };

  // console.log(updatedDetails);

  const student = await Student.findByIdAndUpdate(
    req.user._id,
    updatedDetails,
    {
      new: true,
      runValidators: true,
    }
  );

  await student.save();

  // console.log(student);

  res.status(200).json({
    success: true,
    student,
  });
});

const getAttandance = catchAsyncError(async (req, res, next) => {
  // const studentAttandance = await Attandance.find({student_id : req.user._id}).populate("branch_id course_id teacher", "name courseTeach");

  // console.log(studentAttandance);

  // console.log(req.user);

  const totalAttendance = [];

  // req.user.branchName

  // console.log(req.user.branchName.courses);

  for (let i = 0; i < req.user.branchName.courses.length; i++) {
    const data = await Attandance.find({
      student_id: req.user._id,
      course_id: req.user.branchName.courses[i]._id,
    }).populate("teacher", "name");

    // console.log(req.user.branchName.courses[i].name);
    // console.log(data);

    // data.reduce((total,item,i,array) => {
    //     if(item.status === true){
    //         return total + 1;
    //     }
    // },0);

    // console.log(data[0].date);

    //   AttendenceData.push({totalAttendance[req.user.branchName.courses[i].name] = {
    //     totalAttendance: data.length,
    //     present: data.reduce((total, item, i, array) => {
    //       // console.log((item.date));
    //       if (item.status === true) {
    //         return total + 1;
    //       } else {
    //         return total;
    //       }
    //     }, 0),
    //     teacher : data[0].teacher.name
    //   }
    // }})

    // const objectData = {

    //   req.user.branchName.courses[i].name : {
    //         totalAttendance: ...data.length,
    //         present: ...data.reduce((total, item, i, array) => {
    //           // console.log((item.date));
    //           if (item.status === true) {
    //             return total + 1;
    //           } else {
    //             return total;
    //           }
    //         }, 0),
    //         teacher : data[0].teacher.name
    //       }
    //     }

    // console.log(data[i])
    totalAttendance.push({
      courseName: req.user.branchName.courses[i].name,
      totalAttendance: data.length,
      present: data.reduce((total, item, i, array) => {
        // console.log((item.date));
        if (item.status === true) {
          return total + 1;
        } else {
          return total;
        }
      }, 0),
      teacher: data[i] ? data[i].teacher.name : null,
    });
  }
  // console.log(totalAttendance)

  res.status(200).json({
    success: true,
    totalAttendance,
  });
});

function convert(str) {
  var date = new Date(str),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
  return [date.getFullYear(), mnth, day].join("/");
}

/* To Check Attendence by Date and Status of That Day */
const checkAttendanceStudent = catchAsyncError(async (req, res, next) => {
  const apiFeatures = new AttendanceApi(
    Attandance.find({ student_id: req.user._id }),
    req.query
  )
    .search()
    .filter();
  let studentAttendence = await apiFeatures.query
    .populate("course_id teacher", "name")
    .select(["-branch_id", "-_id", "-student_id", "-__v"]);

  studentAttendence.map((element, i) => {
    let finalDate = "";
    for (let i = 0; i <= 3; i++) {
      finalDate = finalDate + element.date.toString().split(" ")[i] + " ";
    }

    studentAttendence[i] = {
      id: i + 1,
      rollNo: req.user.rollNo,
      name: req.user.name,
      course_id: element.course_id.name,
      date: finalDate,
      teacher: element.teacher.name,
      status: element.status,
      branch: req.user.branchName.name,
    };
  });

  res.status(200).json({
    studentAttendence,
  });
});

module.exports = {
  getStudent,
  createStudents,
  getSingleStudent,
  loginStudent,
  getUserProfile,
  logOut,
  updateStudent,
  getAttandance,
  checkAttendanceStudent,
};
