const { ObjectId } = require("mongodb");
const catchAsyncError = require("../middlewares/catchAsyncError");
const Attandance = require("../models/attendenceSchema");
const Student = require("../models/studentModel");
const getAttandance = catchAsyncError(async(req,res,next) => {
    const attandance = await Attandance.find({});
    res.status(200).json({
        success : true,
        attandance
    })

}); 

function convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
}

const createAttandance = catchAsyncError(async(req,res,next) => {
    // console.log(new Date(req.body.date));
    // console.log(req.body);
    // console.log(convert(req.body.date));
    // console.log(req.user.branchTeach);
    const {branch_id,courseTeach} = req.user.branchTeach.find((item, i) => {
        if(item.branch_id.name === req.body.branchName){
            return item;
        }
    });
    // console.log(branch_id);
    // console.log(courseTeach)

    const courseData = courseTeach.find( (item,i) => {
        if(item.name === req.body.courseTeach){
            return item;
        }
    });
    // console.log(courseData)

    // console.log(req.body);
    // console.log(req.body.allStudent[0]._id)


    req.body.allStudent.map(async(key) => {
        const attandanceData = {
            branch_id : branch_id._id,
            course_id : courseData._id,
            date : convert(req.body.date),
            teacher : req.user._id,
            student_id : new ObjectId(key._id),
            status : key.status
        } 
        
        const attandance = await Attandance.create(attandanceData);
    });
    // })
    // console.log(attandanceData.date)
    // console.log(new Date(req.body.date));

    res.status(200).json({
        success : true,
        message : "Attendance Saved",
    });
});

/* Total Attendance of Whole Branch --- Of Each Subject  --- Hod Route Only*/

const getBranchStudentAttendance = catchAsyncError(async (req,res,next) => {
    
    const student = await Student.find({branch_id : req.body.branchName});

    for(let i = 0 ; i < student.length ; i++){
        // const attendance = await Attandance.find() 
    }

});



// const getSingleStudent = catchAsyncError( async (req,res,next) => {
    
// });




module.exports = {createAttandance, getAttandance};