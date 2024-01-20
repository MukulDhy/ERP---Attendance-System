import {
  GET_BRANCH_STUDENT_FAIL,
  GET_BRANCH_STUDENT_REQUEST,
  GET_BRANCH_STUDENT_SUCCESS,
} from "../../constant/branch/branchContant";

export const branchStudentReducer = (state = { allBranchStudent: [] }, action) => {
  switch (action.type) {
    case GET_BRANCH_STUDENT_REQUEST:
      return { loading: true, allBranchStudent: [] };
    case GET_BRANCH_STUDENT_SUCCESS:
      return { loading: false, allBranchStudent: action.payload };
    case GET_BRANCH_STUDENT_FAIL:
      return { loading: false, error: action.payload, message: action.message };
    default:
      return state ;
  }
};
