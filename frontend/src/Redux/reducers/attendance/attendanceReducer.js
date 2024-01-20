import { ATTENDANE_CREATE_FAIL, ATTENDANE_CREATE_REQUEST, ATTENDANE_CREATE_SUCCESS } from "../../constant/attendance/attendanceConstant";

export const attendanceCreateReducer = (state = { attendanceCreate: {} }, action) => {
    switch (action.type) {
      case ATTENDANE_CREATE_REQUEST:
        return { loading: true };
      case ATTENDANE_CREATE_SUCCESS:
        return { loading: false, message: action.payload.message,success : action.payload.success };
      case ATTENDANE_CREATE_FAIL:
        return { loading: false, error: action.payload, success: action.payload.success };
      default:
        return state;
    }
  };