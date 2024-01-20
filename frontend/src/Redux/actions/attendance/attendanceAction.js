import axios from "axios";
import { ATTENDANE_CREATE_FAIL, ATTENDANE_CREATE_REQUEST, ATTENDANE_CREATE_SUCCESS } from "../../constant/attendance/attendanceConstant";

export const attendanceCreateAction = (attendanceData) => async (dispatch) => {
  try {
    dispatch({ type: ATTENDANE_CREATE_REQUEST });
    const config = { headers: { "Contetn-Type": "application/json" } };
    const { data } = await axios.post("/api/attendence/create",{...attendanceData},config);
    dispatch({type : ATTENDANE_CREATE_SUCCESS , payload : data});
  } catch (error) {
    dispatch({
        type: ATTENDANE_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
  }
};
