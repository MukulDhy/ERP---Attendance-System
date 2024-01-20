const express = require('express');
const { getCourse, createCourse } = require('../controllers/courseController');
const { isAuthorization, authorizationRole } = require('../middlewares/authMiddleware');
const courseRouter = express.Router();

/* To get Course */
courseRouter.route('/').get(isAuthorization,authorizationRole("admin"),getCourse);
/* To Create A Course */
courseRouter.route('/new').get(isAuthorization,authorizationRole("admin"),createCourse);

module.exports = courseRouter;