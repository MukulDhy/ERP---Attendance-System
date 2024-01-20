const express = require("express");
const { getTeacher, createTeacher, loginTeacher, getSingleTeacher, getUserProfile, logOut, checkAttendance } = require("../controllers/staffController");
const {
  isAuthorization,
  authorizationRole,
} = require("../middlewares/authMiddleware");

const teacherRoute = express.Router();

/* To get teacher */
teacherRoute.route('/').get(isAuthorization,authorizationRole("staff","admin"),getTeacher);

/* To Create Teacher */
teacherRoute.route('/new').post(isAuthorization,authorizationRole("admin","staff"),createTeacher);
// teacherRoute.route('/new').post(createTeacher);

/* To login teacher */
teacherRoute.route('/login').post(loginTeacher);

teacherRoute.route('/checkAttendence').get(isAuthorization,authorizationRole("staff","admin"),checkAttendance);

/* To get Single Teacher Deatils */

// teacherRoute.route('/:id').post(isAuthorization,authorizationRole("admin"),getSingleTeacher);

/* To Get Profile Teacher */
teacherRoute.route('/profile').get(isAuthorization,authorizationRole("staff"),getUserProfile);

/* To LogOut Teacher */

teacherRoute.route('/logout').get(isAuthorization,authorizationRole("staff"),logOut);






module.exports = teacherRoute;
