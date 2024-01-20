const express = require("express");
const createTimeTable = require("../controllers/timeTableController");
const { authorizationRole, isAuthorization } = require("../middlewares/authMiddleware");
const router = express.Router();


router.route('/new').post(isAuthorization,authorizationRole("admin","staff"),createTimeTable);

module.exports = router;