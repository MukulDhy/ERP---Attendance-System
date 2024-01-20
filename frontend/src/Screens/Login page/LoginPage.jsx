import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  staffloginAction,
  studentloginAction,
} from "../../Redux/actions/user/userAction";
import "./login.css";
import { Alert } from "@mui/material";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const redirect = location.pathname ? location.pathname.split("=")[1] : "/";
  const [rollNo, setRollNo] = useState("");
  const [password, setPassword] = useState("");

  const [teacherLogin, setTeacherLogin] = useState(false);
  // const [adminLogin,setAdminLogin] = useState(false);

  const dispatch = useDispatch();
  // const {loading,message,userLoginDetails,error} = useSelector(state => state.userLogin);
  const { userLoginDetails, error } = useSelector((state) => state.userLogin);
  // console.log(data);
  useEffect(() => {
    if (userLoginDetails) {
      navigate("/");
    }
  }, [userLoginDetails, error, navigate]);

  const submintHandeler = (e) => {
    e.preventDefault();
    if (teacherLogin) {
      dispatch(staffloginAction(rollNo, password));
    } else {
      dispatch(studentloginAction(rollNo, password));
    }
  };

  return (
    <>
      {error && (
        <Alert
          variant="filled"
          severity="info"
          style={{ transition: "2s ease" }}
        >
          {error}
        </Alert>
      )}
      <section className="loginForm">
        <div className="loginForm-box">
          <div className="loginForm-value">
            <form onSubmit={submintHandeler}>
              <h2>Login</h2>
              <div className="inputbox">
                <ion-icon name="mail-out  line"></ion-icon>
                <input
                  type="text"
                  value={rollNo}
                  onChange={(e) => setRollNo(e.target.value)}
                  required
                />
                <label htmlFor="rollNo">Enter your Id</label>
              </div>
              <div className="inputbox">
                <ion-icon name="lock-closed-outline"></ion-icon>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <label htmlFor="password">Password</label>
              </div>

              <div
                className="forget"
                style={{ display: "flex", justifyContent: "space-around" }}
              >
                <label htmlFor="Remember">
                  <input
                    type="checkbox"
                    id="teaherCheckBox"
                    onChange={(e) => setTeacherLogin(e.target.checked)}
                  />
                  STAFF LOGIN
                </label>
                {/* <label htmlFor="Remember">
                  <input type="checkbox" id = "AdminCheckBox" onChange={(e) => setAdminLogin(e.target.checked)} />
                  ADMIN LOGIN
                </label> */}
                {/* <Link to="/forgotPassword">Forget Password</Link> */}
              </div>
              <button type="sumbit" className="loginBtn">
                Log in
              </button>
              <div className="register">
                <p>
                  Don't have a account{" "}
                  <Link
                    to={
                      redirect ? `register?redirect=${redirect}` : `/register`
                    }
                  >
                    Register
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
      <script
        type="module"
        src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"
      ></script>
      <script
        noModule
        src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"
      ></script>
    </>
  );
};

export default LoginPage;
