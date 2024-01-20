const catchAsyncError = require("../middlewares/catchAsyncError");
const Attandance = require("../models/attendenceSchema");
const Branch = require("../models/branchModel");
const Course = require("../models/courseSchema");
const Student = require("../models/studentModel");
const Teacher = require("../models/teacherSchema");
const TimeTable = require("../models/timeTableSchema");
const ErrorHandler = require("../utils/ErrorHandler");

const createTimeTable = catchAsyncError(async(req,res,next) => {
    const timeTableExist = await TimeTable.find({branch_id : req.body.branch_id});
    console.log(timeTableExist)
    if(timeTableExist){
        return next(new ErrorHandler("Time Table Already Exist",402));
    }
    const branch = await Branch.findOne({branch_id : req.body.branch_id});
    // console.log(branch);
    if(!branch){
        return next(new ErrorHandler("Branch is not Exist",401));
    }
    for(let ele in req.body){
        // console.log(`${ele}  :  ${req.body[ele]}`);
        // console.log(req.body[ele].length);
        if(req.body[ele].length === 4){
            for(let i = 0; i < 4; i++){
                const teacher = await Teacher.findOne({staff_Id : req.body[ele][i].teacher});
                const course = await Course.findOne({course_id : req.body[ele][i].course_id});
                // console.log(Lcourse)
                req.body[ele][i].teacher = teacher._id;
                if(course){
                    req.body[ele][i].course_id = course._id;
                }
            }
        }
    }
    req.body.branch_id = branch._id;
    // console.log(req.body);
    
    const timeTable = await TimeTable.create(req.body);
    
    res.status(200).json({
        message : "Successfully Created",
        timeTable
    });
    
})

module.exports = createTimeTable;