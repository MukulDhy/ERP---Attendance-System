const catchAsyncError = require("../middlewares/catchAsyncError");
const Course = require("../models/courseSchema");
const ErrorHandler = require("../utils/ErrorHandler");
const ApiFeatures = require("../utils/ApiFeaturs");
const gernateJWTtoken = require("../utils/sendJWTToken");
const Teacher = require("../models/teacherSchema");
// const Course = require("../models/courseSchema");
// const { startSession } = require('../models/CourseModel');

/* Get All Course  -- TeacherRoute and Admin */
const getCourse = catchAsyncError(async (req, res) => {
  // const Coursees = await Course.find();

  // await Course.find()
  //     .populate("course")
  //     .then(p=>console.log(p))
  //     .catch(error=>console.log(error));

  const apiFeatures = new ApiFeatures(Course.find(), req.query).search();
  const course = await apiFeatures.query.populate("teacherAssign", "name");

  // let course = await Course.findOne({ name: req.body.courseName }).populate(
  //   "teacherAssign",
  //   "name"
  // );
  //   res.status(200).json({ data: [...data], success: true });

  res.status(200).json({
    success: true,
    course,
    // data
  });
});

/* new Course Create  -- Admin Routes */
const createCourse = catchAsyncError(async (req, res, next) => {
  let course_id = req.body.course_id.toUpperCase();
  //   console.log(course_id)
  const CourseExist = await Course.findOne({ course_id });

  if (CourseExist) {
    return next(new ErrorHandler("Course Already Exist", 400));
  }
  // for (let i = 0; i < req.body.teacherAssign.length; i++) {
  //   const data = await Teacher.findOne({
  //     name: {
  //       $regex: new RegExp("^" + req.body.teacherAssign[i].toUpperCase(), "i"),
  //     },
  //   });
  //   req.body.teacherAssign[i] = data._id;
  // }

  // console.log(req.body.teacherAssign);

  const orgData = {
    ...req.body,
    // teacherAssign: req.body.teacherAssign,
  };

  //   console.log(orgData);

  const course = await Course.create(orgData);

  res.status(200).json({
    success: true,
    course,
  });
});

// /* Get Single Course --Course Route */
// const getSingleCourse = catchAsyncError(async(req,res,next) => {

//         const Course = await Course.findById(req.params.id);

//         if(!Course){
//             return next(new ErrorHandler("Course Not FOund",404));
//         }

//         res.status(200).json({
//             success : true,
//             Course
//         })
// });

/* Get Course Profile */
// const getUserProfile = catchAsyncError(async(req,res,next) => {
//     console.log(req.user);
//     const user = req.user;

//     res.status(200).json({
//         success : true,
//         user
//     })
// });

// /* LogOut Course */
// const logOut = catchAsyncError(async(req,res,next) => {
//     res.cookie("token", null, { expires: new Date(Date.now()), httpOnly: true });
//     res.status(200).json({
//         success : true,
//         message : "LogOut SuccessFully"
//     })
// });

/* Update Course Profile */
const updateCourse = catchAsyncError(async (req, res, next) => {
  let Course = await Course.findOne(req.query.Course_id);

  console.log(Course);

  if (!Course) {
    return next(new ErrorHandler("Course Does not Exist", 404));
  }

  Course = await Course.findByIdAndUpdate(Course._id, req.body, {
    new: true,
    runValidators: true,
  });

  await Course.save();
  console.log(Course);
  // console.log(Course);

  res.status(200).json({
    success: true,
    Course,
  });
});

module.exports = { getCourse, createCourse, updateCourse };
