import {
  ALL_STUDENT_FAIL,
  ALL_STUDENT_REQUEST,
  ALL_STUDENT_SUCCESS,
  GET_USER_ATTENDANCE_FAIL,
  GET_USER_ATTENDANCE_REQUEST,
  GET_USER_ATTENDANCE_SUCCESS,
  SINGLE_STUDENT_FAIL,
  SINGLE_STUDENT_REQUEST,
  SINGLE_STUDENT_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT_FAIL,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
} from "../../constant/user/userConstant";

export const userLoginReducers = (state = { userLoginDetails: null }, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true ,message : "Wait...."};

    case USER_LOGIN_SUCCESS:
      return { loading: false, userLoginDetails: action.payload  , message : action.payload.message };

    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload , message : action.payload.message };

    case USER_LOGOUT_REQUEST:
      return { loading: true , message : "Wait...."};

    case USER_LOGOUT_SUCCESS:
      return { loading: false };

    case USER_LOGOUT_FAIL:
      return { loading: false, error: action.payload , message : action.payload.message };

    default:
      return state;
  }
};



export const userLoginAttendanceReducer = (state = {userLoginAttendance : []},action) => {
    switch (action.type) {
      case GET_USER_ATTENDANCE_REQUEST:
          return {loading : true , message : "wait...." ,userLoginAttendance : [] }
      case GET_USER_ATTENDANCE_SUCCESS:
          return {loading : false , userLoginAttendance : action.payload.totalAttendance }
      case GET_USER_ATTENDANCE_FAIL:
          return {loading : false , error : action.payload}    
      default:
        return state
    }
};

export const getAllStudentReducer = (state = {allStudent : []},action) => {
    switch (action.type){
      case ALL_STUDENT_REQUEST : 
        return {loading : true,allStudent : []}
      case ALL_STUDENT_SUCCESS : 
        return {loading : false,allStudent : action.payload.students}
      case ALL_STUDENT_FAIL :
        return {loading : false , error : action.payload}    
      default:
        return state  
    }
}

export const singleStudentDetailsReducer = (state = {studentDetail : {}},action) => {
    switch (action.type){
      case SINGLE_STUDENT_REQUEST : 
        return {loading : true,studentDetail : {}}
      case SINGLE_STUDENT_SUCCESS : 
        return {loading : false,studentDetail : action.payload.student}
      case SINGLE_STUDENT_FAIL :
        return {loading : false , error : action.payload}    
      default:
        return state  
    }
}
