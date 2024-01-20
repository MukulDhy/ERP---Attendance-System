import axios from "axios";
import { GET_BRANCH_STUDENT_FAIL, GET_BRANCH_STUDENT_REQUEST, GET_BRANCH_STUDENT_SUCCESS } from "../../constant/branch/branchContant";


export const getBranchStudent = (branch) => async (dispatch) => {

    try {
        dispatch({type : GET_BRANCH_STUDENT_REQUEST});
        const config = {headers : {"Content-Type" : "application/json"}};
        const {data} = await axios.get('/api/branch/branchStudent',{params : { branchName : `${branch}`}},config)
        // console.log(data);
        dispatch({type : GET_BRANCH_STUDENT_SUCCESS, payload : data.allBranchStudent});
        
    } catch (error) {
        dispatch({
            type: GET_BRANCH_STUDENT_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
          });
    }
};