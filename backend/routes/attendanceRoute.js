const express = require('express');
const { createAttandance, getAttandance } = require('../controllers/attandController');
const { isAuthorization, authorizationRole } = require('../middlewares/authMiddleware');
const attendanceRoute = express.Router();


attendanceRoute.route('/').get(getAttandance);

attendanceRoute.route('/create').post(isAuthorization,authorizationRole("staff","admin"),createAttandance);

module.exports = attendanceRoute;

