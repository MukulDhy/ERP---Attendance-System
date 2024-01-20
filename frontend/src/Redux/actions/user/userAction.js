import axios from "axios";
import {
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
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
} from "../../constant/user/userConstant";

export const studentloginAction = (rollNo, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const config = { headers: { "Content-Type" : "application/json" } };

    const {data} = await axios.post(
      "/api/student/login",
      { rollNo, password },
      config
    );
    data.user.isHod = data.isHod;
    // console.log(data);
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data.user });
    
    localStorage.setItem("userLogin", JSON.stringify(data.user));
  } catch (error) {
    // console.log(error);
    // console.log()
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
      error.response && error.response.data.message
      ? error.response.data.message
      : error.message,
    });
  }
};
export const staffloginAction = (staff_Id, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    
    const config = { headers: { "Content-Type" : "application/json" } };
    
    const {data} = await axios.post(
      "/api/teacher/login",
      { staff_Id, password },
      config
      );
      
      data.user.isHod = data.isHod;
      dispatch({ type: USER_LOGIN_SUCCESS, payload:data.user});
      
      localStorage.setItem("userLogin", JSON.stringify(data.user));
    } catch (error) {
      // console.log(error);
    // console.log()
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// export const studentloginAction = (rollNo, password) => async (dispatch) => {
//   try {
//     dispatch({ type: USER_LOGIN_REQUEST });

//     const config = { headers: { "Content-Type" : "application/json" } };

//     const {data} = await axios.post(
//       "/api/student/login",
//       { rollNo, password },
//       config
//     );
//     // console.log(data);
//     dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

//     localStorage.setItem("userLogin", JSON.stringify(data.user));
//   } catch (error) {
//     // console.log(error);
//     // console.log()
//     dispatch({
//       type: USER_LOGIN_FAIL,
//       payload:
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message,
//     });
//   }
// };

export const logOutAction = () => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGOUT_REQUEST });
    await axios.get('/api/student/logout');
    localStorage.setItem("userLogin",null);
    localStorage.removeItem('userLogin');
    dispatch({ type: USER_LOGOUT_SUCCESS});
  } catch (error) {
    // console.log(error);
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const userAttendanceAction = () => async (dispatch) => {

  try {

    dispatch({type : GET_USER_ATTENDANCE_REQUEST});
    const {data} = await axios.get('/api/student/attendence');
    // console.log(data);

    dispatch({type : GET_USER_ATTENDANCE_SUCCESS , payload : data});

  } catch (error) {
    // console.log(error);
    dispatch({
      type: GET_USER_ATTENDANCE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}

export const getAllStudentAction = (queryData) => async(dispatch) => {
  try {
    dispatch({type : ALL_STUDENT_REQUEST});

    const config = { headers: { "Content-Type" : "application/json" } };

    const {data} = await axios.get('/api/student',queryData,config);

    dispatch({type : ALL_STUDENT_SUCCESS , payload : data });

  } catch (error) {
    dispatch({
      type: GET_USER_ATTENDANCE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
} 

export const singleStudentDeatilAction = (id) => async(dispatch) => {
  try {
    dispatch({type : SINGLE_STUDENT_REQUEST});

    // console.log(id);

    const config = { headers: { "Content-Type" : "application/json" } };

    const {data} = await axios.get(`/api/student/${id}`,config);
    // console.log(data);
    dispatch({type : SINGLE_STUDENT_SUCCESS , payload : data });

  } catch (error) {
    dispatch({
      type: SINGLE_STUDENT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}
