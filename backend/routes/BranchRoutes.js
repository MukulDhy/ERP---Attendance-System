const express = require('express');
const { getBranch, createBranch, updateBranch, branchStudent } = require('../controllers/branchController');
const { isAuthorization, authorizationRole } = require('../middlewares/authMiddleware');
const branchRouter = express.Router();

/* Get All Branch */
branchRouter.route('/').get(isAuthorization,authorizationRole("admin","staff","student"),getBranch);

/* Create New Branch */
branchRouter.route('/new').get(isAuthorization,authorizationRole("admin"),createBranch);
// branchRouter.route('/new').post(createBranch);

/* get All Branch Student  --  query --- staff -- admin*/
branchRouter.route('/branchStudent').get(isAuthorization,authorizationRole("staff","admin"),branchStudent);

/* Update Branch */
branchRouter.route('/update/:id').get(isAuthorization,authorizationRole("admin"),updateBranch);



module.exports = branchRouter;