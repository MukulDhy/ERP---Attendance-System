const catchAsyncError = require("../middlewares/catchAsyncError");
const Branch = require("../models/branchModel");
const ErrorHandler = require("../utils/ErrorHandler");
const ApiFeatures = require("../utils/ApiFeaturs");
const gernateJWTtoken = require("../utils/sendJWTToken");
const Teacher = require("../models/teacherSchema");
const Course = require("../models/courseSchema");
const Student = require("../models/studentModel");
// const { startSession } = require('../models/BranchModel');

/* Get All Branch  -- TeacherRoute and Admin */
const getBranch = catchAsyncError(async (req,res) => {
  const apiFeatures = new ApiFeatures(Branch.find(), req.query).search();
  const branches = await apiFeatures.query.populate("hod courses", "name");
  // const branches = await Branch.find();

  // await Branch.find()
  //     .populate("course")
  //     .then(p=>console.log(p))
  //     .catch(error=>console.log(error));

  //   res.status(200).json({ data: [...data], success: true });

  res.status(200).json({
    success: true,
    branches,
    // data
  });
});

/* new Branch Create  -- Admin Routes */
const createBranch = catchAsyncError(async (req, res, next) => {
  let branch_id = req.body.branch_id;
  const BranchExist = await Branch.findOne({ branch_id });
  if (BranchExist) {
    return next(new ErrorHandler("Branch Already Exist", 400));
  }

  let staff_Id = req.body.hod;
  // console.log(staff_Id);
  const teacher = await Teacher.findOne({ staff_Id });
  // console.log(teacher);
  // console.log(req.body.courses.length);

  // courseData.push();
  // req.body.courses.map((key,i) => {
  //     try{
  //         const data = Course.modelName.findOne({course_id : key});
  //         console.log(data._id);
  //         courseData.push(data._id);
  //         req.body.courses[i] = data._id;
  //         // console.log("------------");
  //         // console.loh(courseData);
  //     }catch(error){
  //         return next(new ErrorHandler(error.message,400))
  //     }
  // })

  // console.log(req.body.courses)
  if(req.body.courses){
    for (let i = 0; i < req.body.courses.length; i++) {
      const data = await Course.findOne({
        course_id: req.body.courses[i],
      });
      // console.log(data);
      req.body.courses[i] = data._id;
    }
  }

  //   console.log(req.body.courses);

  // const course = await Course.find({...req.body.courses});
  // console.log(course);

  // console.log(teacher ? teacher._id : null);
  const orgData = {
    ...req.body,
    hod: teacher ? teacher._id : null,
    courses: req.body.courses ? req.body.courses : null,
  };
  //   console.log(orgData);

  const branch = await Branch.create(orgData);

  res.status(200).json({
    // ...req.body.courses,
    success: true,
    branch,
  });
});



// /* Get Single Branch --Branch Route */
// const getSingleBranch = catchAsyncError(async(req,res,next) => {

//         const Branch = await Branch.findById(req.params.id);

//         if(!Branch){
//             return next(new ErrorHandler("Branch Not FOund",404));
//         }

//         res.status(200).json({
//             success : true,
//             Branch
//         })
// });

/* Get Branch Profile */
// const getUserProfile = catchAsyncError(async(req,res,next) => {
//     console.log(req.user);
//     const user = req.user;

//     res.status(200).json({
//         success : true,
//         user
//     })
// });

// /* LogOut Branch */
// const logOut = catchAsyncError(async(req,res,next) => {
//     res.cookie("token", null, { expires: new Date(Date.now()), httpOnly: true });
//     res.status(200).json({
//         success : true,
//         message : "LogOut SuccessFully"
//     })
// });

/* Update Branch Profile */
const updateBranch = catchAsyncError(async (req, res, next) => {
  let branch = await Branch.findById(req.params.id);
  
  // console.log(branch);

  if (!branch) {
    return next(new ErrorHandler("Branch Does not Exist", 404));
  }

  console.log(req.body);
  branch = await Branch.findByIdAndUpdate(branch._id, req.body, {
    new: true,
    runValidators: true,
  });

  await branch.save();
  console.log(branch);
  // console.log(branch);

  res.status(200).json({
    success: true,
    branch,
  });
});


const branchStudent = catchAsyncError(async (req,res,next) => {

  
  if(!req.query.branchName){
    return next(new ErrorHandler("Please Enter Branch Name",404));
  }

  const branch = await Branch.findOne({name : req.query.branchName});
  if(!branch){
    return next(new ErrorHandler("Branch Not Found",404));
  }
  // console.log(branch)

  const allBranchStudent = await Student.find({branchName : branch._id}).select(['-role','-createdAt','-updatedAt','-__v']);

  // console.log(allBranchStudent);

  res.status(200).json({
    success : true,
    allBranchStudent
  })
});

module.exports = { getBranch, createBranch, updateBranch,branchStudent };
