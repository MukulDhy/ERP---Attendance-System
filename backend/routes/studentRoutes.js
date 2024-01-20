const express = require("express");
const {
  getStudent,
  createStudents,
  getSingleStudent,
  loginStudent,
  getUserProfile,
  logOut,
  updateStudent,
  getAttandance,
  checkAttendanceStudent,
} = require("../controllers/studentController");
const {
  isAuthorization,
  authorizationRole,
} = require("../middlewares/authMiddleware");

const router = express.Router();

router
  .route("/")
  .get(isAuthorization, authorizationRole("admin", "staff"), getStudent);

router
  .route("/new")
  .post(isAuthorization, authorizationRole("admin","staff"), createStudents);

router.route("/login").post(loginStudent);

router.route("/logout").get(logOut);

router
  .route("/profile")
  .get(isAuthorization, getUserProfile)
  .put(isAuthorization, updateStudent);

router
  .route("/attendence")
  .get(isAuthorization, authorizationRole("student"), getAttandance);

router
  .route("/checkAttendence")
  .get(isAuthorization, authorizationRole("student"), checkAttendanceStudent);

router
  .route("/:id")
  .get(isAuthorization, authorizationRole("admin", "staff"), getSingleStudent);

// router.route('/update/:id').get(isAuthorization);

// router.route('/:id').put(isAuthorization,authorizationRole("admin"),getSingleStudent);

module.exports = router;
