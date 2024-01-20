import { Box, Button, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
// import { mockTransactions } from "../../data/mockData";
// import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
// import EmailIcon from "@mui/icons-material/Email";
import Header from "../../components/Header";
// import LineChart from "../../components/LineChart";
// import GeographyChart from "../../components/GeographyChart";
// import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
// import ProgressCircle from "../../components/ProgressCircle";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userAttendanceAction } from "../../Redux/actions/user/userAction";
// import LinearProgress from "";
import CircularProgress from "@mui/material/CircularProgress";
import { Link } from "react-router-dom";
// import PieChart from "../../components/PieChart";
// import { CircularProgressbar } from 'react-circular-progressbar';
// import 'react-circular-progressbar/dist/styles.css';
// import { mockPieData } from "../../data/mockData";
// import MenuItem from "@mui/material";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const dispatch = useDispatch();

  const { userLoginDetails } = useSelector((state) => state.userLogin);
  const { loading, userLoginAttendance } = useSelector(
    (state) => state.userLoginAttendance
  );

  // console.log(userLoginAttendance);

  // const pieChartData = [];

  // Object.keys(userLoginAttendance).map( (key) =)

  useEffect(() => {
    if (userLoginDetails.role === "student") {
      dispatch(userAttendanceAction());
    }
  }, [dispatch, userLoginDetails]);

  return (
    <>
      {/* HEADER */}
      {loading ? (
        <CircularProgress disableShrink />
      ) : (
        <>
          {" "}
          <Box m="20px">
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

              <Box>
                <Button
                  sx={{
                    backgroundColor: colors.blueAccent[700],
                    color: colors.grey[100],
                    fontSize: "14px",
                    fontWeight: "bold",
                    padding: "10px 20px",
                  }}
                >
                  {/* <DownloadOutlinedIcon sx={{ mr: "10px" }} /> */}
                  {/* Download Reports */}
                </Button>
              </Box>
            </Box>

            {/* GRID & CHARTS */}
            <Box
              display="grid"
              gridTemplateColumns="repeat(12, 2fr)"
              // gridAutoRows="10px"
              alignContent={"baseline"}
              gap="10px"
            >
              {/* ROW 1 */}

              {userLoginDetails.role === "student" &&
                userLoginAttendance &&
                userLoginAttendance.map((key, i) => {
                  // console.log(key.present)
                  return (
                    <Box
                      gridColumn="span 3"
                      backgroundColor={colors.primary[400]}
                      display="flex"
                      alignContent="flex-start"
                      justifyContent="center"
                      key={i}
                    >
                      <StatBox
                        title={` Total Attendence : ${key.present} / ${key.totalAttendance} `}
                        subtitle={key.courseName}
                        progress={`${
                          key.present / key.totalAttendance > 0
                            ? Math.round(
                                (key.present / key.totalAttendance +
                                  Number.EPSILON) *
                                  100
                              ) / 100
                            : 0
                        }`}
                        // increase="+20%"
                        // icon={
                        //   <EmailIcon
                        //     sx={{
                        //       color: colors.greenAccent[600],
                        //       fontSize: "26px",
                        //     }}
                        //   />
                        // }
                        subtitle2={key.teacher}
                      />
                    </Box>
                  );
                })}
            </Box>
            {/* ROW 2 */}

            {/* {userLoginDetails.role === "student" && (
              <>
              <PieChart></PieChart>
              
              </>
            )} */}

            {/* {userLoginDetails.role === "student" && (
              <Box
                gridColumn="span 12"
                gridRow="span 2"
                backgroundColor={colors.primary[400]}
              >
                <Box
                  mt="10px"
                  p="0 30px"
                  display="flex "
                  justifyContent="space-between"
                  alignItems="center"
                  height="250px"
                >
                  <Box>
                    <Typography
                      variant="h5"
                      fontWeight="600"
                      color={colors.grey[100]}
                    >
                      Overall Attendence
                    </Typography>
                    <Typography
                      variant="h3"
                      fontWeight="bold"
                      color={colors.greenAccent[500]}
                    >
                      Total Classes :{" "}
                      {Object.keys(userLoginAttendance).reduce(
                        (total, item) => {
                          return (
                            total + userLoginAttendance[item].totalAttendance
                          );
                        },
                        0
                      )}
                    </Typography>
                    <Typography
                      variant="h4"
                      fontWeight="600"
                      color={colors.redAccent[500]}
                    >
                      Class Taken :{" "}
                      {Object.keys(userLoginAttendance).reduce(
                        (total, item) => {
                          return total + userLoginAttendance[item].present;
                        },
                        0
                      )}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            )} */}

            {/* ROW 1 */}
            <Box
              display="grid"
              // gridTemplateColumns="repeat(12, 1fr)"
              // gridAutoRows="150px"
              gap="25px"
            >
              {userLoginDetails.role === "staff" &&
                userLoginDetails.branchTeach.map((key) => {
                  // console.log(key.present)
                  return (
                    <>
                      <Box
                        gridColumn="span 4"
                        backgroundColor={colors.primary[400]}
                        // display="flex"
                        padding="10px"
                        // alignItems="center"
                        // justifyContent="center"
                        key={key.branch_id._id}
                      >
                        <Box 
                        display={"flex"}
                        justifyContent="space-between">
                          <Typography
                            variant="h4"
                            color={colors.greenAccent[400]}
                            fontSize="30px"
                            // textAlign={"center"}
                            marginBottom={"15px"}
                          >
                            Branch : {key.branch_id.name}
                          </Typography>
                          <Typography
                            variant="h4"
                            marginRight={"5px"}
                            color={colors.blueAccent[400]}
                            fontSize="25px"
                            // textAlign={"center"}
                            marginBottom={"15px"}
                          >
                            Total Student :&nbsp;{" "}
                            <span style={{"color" : "red"}}>
                            {key.branch_id.totalStudent
                              ? key.branch_id.totalStudent
                              : "No Student"}
                            </span>
                          </Typography>
                        </Box>

                        {key.courseTeach.map((course, i) => {
                          return (
                            <Link
                              to={`course/${course._id}`}
                              key={i}
                              style={{ textDecoration: "none" }}
                            >
                              {/* <MenuItem style={{paddingLeft: 13, textDecoration: 'none'}}> */}

                              <Typography
                                variant="h3"
                                color={colors.blueAccent[100]}
                                fontSize="20px"
                                marginY={"10px"}
                              >
                                {course.name}
                              </Typography>
                              {/* </MenuItem> */}
                            </Link>
                          );
                        })}
                      </Box>
                    </>
                  );
                })}
            </Box>
          </Box>
        </>
      )}
    </>
  );
};

export default Dashboard;
