import { createStore } from "redux";
import thunk from "redux-thunk";
import { getAllStudentReducer, singleStudentDetailsReducer, userLoginAttendanceReducer, userLoginReducers } from "./Redux/reducers/user/userReducer";
import { combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { branchStudentReducer } from "./Redux/reducers/branch/branchReducer";
import { attendanceCreateReducer } from "./Redux/reducers/attendance/attendanceReducer";


const loginFromStorge = localStorage.getItem("userLogin")
  ? JSON.parse(localStorage.getItem("userLogin"))
  : null;


const rootReducer = combineReducers({
  userLogin : userLoginReducers,
  userLoginAttendance : userLoginAttendanceReducer,
  branchStudent : branchStudentReducer,
  attendenceCreate : attendanceCreateReducer,
  getAllStudentData : getAllStudentReducer,
  getSingleStudent : singleStudentDetailsReducer
});

const initialState = {
  userLogin : {userLoginDetails : loginFromStorge}
};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;