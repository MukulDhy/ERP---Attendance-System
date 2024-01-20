const catchAsyncError = require("../middlewares/catchAsyncError");
const Student = require("../models/studentModel");
const ErrorHandler = require("../utils/ErrorHandler");
const ApiFeatures = require("../utils/ApiFeaturs");
const gernateJWTtoken = require("../utils/sendJWTToken");
const { startSession } = require("../models/studentModel");
const Branch = require("../models/branchModel");
const Teacher = require("../models/teacherSchema");
const Course = require("../models/courseSchema");
const AttendanceApi = require("../utils/AttendanceApi");
const Attendence = require("../models/attendenceSchema");

/* Get All Teacher  -- TeacherRoute and Admin */
const getTeacher = catchAsyncError(async (req, res) => {
  const apiFeatures = new ApiFeatures(Teacher.find(), req.query).search();
  // const teachers = await apiFeatures.query.populate([{path : 'branch_id'}/* ,{path : 'courseTeach', select : 'name'} */]);

  // const teachers = await Teacher.findOne({...req.body.teacherName}).populate("courseTeach","name");

  const teachers = await apiFeatures.query.populate([
    {
      path: "branchTeach",
      populate: [
        { path: "branch_id", select: "name" },
        { path: "courseTeach", select: "name" },
      ],
    },
  ]);

  res.status(200).json({
    success: true,
    teachers,
  });
});

/* new Teacher Create  -- Admin Routes */
const createTeacher = catchAsyncError(async (req, res, next) => {
  let staff_Id = req.body.staff_Id;
  const TeacherExist = await Teacher.findOne({ staff_Id });

  if (TeacherExist) {
    return next(new ErrorHandler("Teacher Already Exist", 400));
  }

  //   console.log(req.body.branchTeach);

  for (let i = 0; i < req.body.branchTeach.length; i++) {
    const branch = await Branch.findOne({
      branch_id: {
        $regex: new RegExp(
          "^" + req.body.branchTeach[i].branch_id.toUpperCase(),
          "i"
        ),
      },
    });
    /* I can Extrach the Course of That Branch from branch and match the following feilds */
    req.body.branchTeach[i].branch_id = branch._id;
    for (let j = 0; j < req.body.branchTeach[i].courseTeach.length; j++) {
      const course = await Course.findOne({
        course_id: {
          $regex: new RegExp(
            "^" + req.body.branchTeach[i].courseTeach[j].toUpperCase(),
            "i"
          ),
        },
      });
      req.body.branchTeach[i].courseTeach[j] = course._id;
    }
  }

  // req.body.password = req.body.name.split(' ')[0] + "@" +process.env.TEACHER_PASSWORD + Math.round(Math.random()*100 + 10)  
  // console.log(req.body.name.split(' ')[0] + "@" +process.env.TEACHER_PASSWORD + Math.round(Math.random()*100));

  // console.log(req.body);
  //   for (let i = 0; i < req.body.courseTeach.length; i++) {
  //     const data = await Course.findOne({ course_id: req.body.courseTeach[i] });

  //     req.body.courseTeach[i] = data._id;
  //   }

  // console.log(req.body.courseTeach);
  //   console.log(req.body)
  const teacher = await Teacher.create(req.body);

  const token = teacher.gernateJWTtoken();

  res.status(200).json({
    success: true,
    teacher,
    token,
  });
});

/* Login Teacher */

const loginTeacher = catchAsyncError(async (req, res, next) => {
  const { staff_Id } = req.body;
  const teacher = await Teacher.findOne({ staff_Id })
    .select("+password")
    .populate([
      {
        path: "branchTeach",
        populate: [
          { path: "branch_id", select: "branch_id name totalStudent" },
          { path: "courseTeach", select: "name" },
        ],
      },
    ]);

  if (!teacher) {
    return next(new ErrorHandler("Teacher Does Not Exist", 401));
  }
  if (teacher.password !== req.body.password) {
    return next(new ErrorHandler("Password is Invalid", 402));
  }

  const isHod = await Branch.find({hod : teacher._id}).select(['-_id','-courses','-hod','-createdAt','-updatedAt','-__v']);
  
  
  if(!isHod.length){
    // teacher.isHod = null;
    gernateJWTtoken(teacher, 200, res);
  } 
  // console.log(teacher);
  res.isHod = isHod;
  gernateJWTtoken(teacher, 200, res);

});

/* Get Single Teacher --Admin Route */
const getSingleTeacher = catchAsyncError(async (req, res, next) => {
  const teacher = await Teacher.findById(req.params.id);
  if (!teacher) {
    return next(new ErrorHandler("Teacher Not FOund", 404));
  }

  res.status(200).json({
    success: true,
    teacher,
  });
});

/* Get Teacher Profile */
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
// const updateStudent = catchAsyncError( async(req,res,next) => {

//     const updatedDetails = {
//         ...req.user,...req.body
//     };

//     // console.log(updatedDetails);

//     const student = await Student.findByIdAndUpdate(req.user._id,updatedDetails, {
//         new: true,
//         runValidators: true,
//       });

//     await student.save();

//     // console.log(student);

//     res.status(200).json({
//         success : true,
//         student,
//     });

// });

/* Can Be Check By anyone */
/* To Check Attendence by Date and Status of That Day */
const checkAttendance = catchAsyncError(async (req, res, next) => {
  const branch = await Branch.find({ hod: req.user._id });

  // console.log(branch)
  let teacher = req.user._id;
  if (!branch) {
    teacher = null;
  }


  // console.log(teacher);

  const apiFeatures = new AttendanceApi(Attendence.find({ teacher_id : teacher , branch_id : branch }), req.query)
    .search()
    .filter();
  let studentAttendence = await apiFeatures.query
    .populate("course_id teacher branch_id student_id", "name rollNo")
    .select(["-_id", "-__v"]);

  studentAttendence.map((element, i) => {
    let finalDate = "";
    for (let i = 0; i <= 3; i++) {
      finalDate = finalDate + element.date.toString().split(" ")[i] + " ";
    }
    studentAttendence[i] = {
      id: i + 1,
      rollNo: element.student_id.rollNo,
      name: req.user.name,
      course_id: element.course_id.name,
      date: finalDate,
      teacher: element.teacher.name,
      name: element.student_id.name,
      status: element.status,
      branch: element.branch_id.name,
    };
  });

  const isStaffHod = () => {

  }

  res.status(200).json({
    studentAttendence,
  });
});




module.exports = {
  getTeacher,
  createTeacher,
  getSingleTeacher,
  loginTeacher,
  getUserProfile,
  logOut,
  checkAttendance,
};
