import React, { useEffect, useState } from "react";
// import './CheckAttendence.css';
// import './attendence.css'
// import { useNavigate } from "react-router-dom";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
// import { mockDataTeam } from "../../data/mockData";
// import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
// import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
// import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
// import { IconButton } from "@mui/material";
// import InputBase from "@mui/material/InputBase";
// import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useDispatch, useSelector } from "react-redux";
// import Loading from "../../scenes/Loader/Loading";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
// import useFetch from "../../Fetch Data/useFetch";
import axios from "axios";
import { getBranchStudent } from "../../Redux/actions/branch/branchAction";

// import { Dayjs } from "dayjs";
// import { FormControl } from "@mui/material";
// import { InputLabel } from "@mui/material";
// import { Input } from "@mui/material";
// import { FormHelperText } from "@mui/material";

const CheckAttendence = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  //   const [value, setValue] = (React.useState < Dayjs) | (null > null);
  const [value, setValue] = useState([0, 0, 0]);

  const [status, setStatus] = useState("Select Status");
  const [branch, setBranch] = useState("Select Branch");
  const [course, setCourse] = useState("Select Course");
  const [branch_id, setBranch_id] = useState(null);
  const [course_id, setCourse_id] = useState(null);

  const { userLoginDetails } = useSelector((state) => state.userLogin);

  const [isLoading, setIsLoading] = useState(false);
  const [apiData, setApiData] = useState([]);
  const [apiError, setApiError] = useState("");

  // console.log(Date.now().valueOf);
  // console.log(apiData);
  // console.log(apiError);

  // async function fetchData() {
  //   try {

  //     setIsLoading(true);
  //     const config = {headers : {"Content-Type" : "application/json"}};
  //     const response = await axios.get("/api/student/checkAttendence",{params : { keyword : value.$d , status : status}},config);
  //     setApiData(response.data.setIsLoading);
  //     setIsLoading(false);
  //   } catch (error) {
  //     setIsLoading(false);
  //     setApiError(
  //       error.response && error.response.data.message
  //         ? error.response.data.message
  //         : error.message
  //     );
  //   }
  // }

  const courseData =
    userLoginDetails.role === "staff"
      ? userLoginDetails.branchTeach.find((item) => {
          // console.log(item.branch_id.name)
          return item.branch_id.name === branch;
        })
      : null;

  // const { loading, allBranchStudent, error } = useSelector(
  //   (state) => state.branchStudent
  // );

  // allBranchStudent.forEach((val, i) => {
  //   val.id = i + 1;
  //   val.branchName = branch;
  //   val.status = false;
  //   val.teacher = userLoginDetails.name;
  // });

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData(requestString, data) {
      try {
        // console.log(apiData);

        setIsLoading(true);
        const config = { headers: { "Content-Type": "application/json" } };
        const response = await axios.get(requestString, data, config);
        setApiData(response.data.studentAttendence);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setApiError(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        );
      }
    }
    if (userLoginDetails.role === "student") {
      // if(value.$d){
      //   fetchData("/api/student/checkAttendence",{params : { keyword : value.$d , status : status === "Select Status" ? null : status }});
      //   // setStatus("Select Status");
      // }
      // if(status){
      //   fetchData("/api/student/checkAttendence",{params : { keyword : value.$d , status : status === "Select Status" ? null : status }});
      // }
      fetchData("/api/student/checkAttendence", {
        params: {
          keyword: value.$d,
          status: status === "Select Status" ? null : status,
        },
      });
    }
    if (userLoginDetails.role === "staff") {
      fetchData("/api/teacher/checkAttendence", {
        params: {
          keyword: value.$d,
          branch_id: branch === "Select Branch" ? null : branch_id,
          course_id: course === "Select Branch" ? null : course_id,
          status: status === "Select Status" ? null : status,
        },
      });
      // console.log("teacher");
    }
  }, [
    value.$d,
    status,
    userLoginDetails.role,
    branch,
    setApiData,
    course_id,
    branch_id,
    course,
  ]);

  // useEffect(() => {

  //   fetch("/api/student/checkAttendence",)

  // }, [third])

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "rollNo",
      headerName: "Roll No",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    // {
    //   field: "phone",
    //   headerName: "Phone Number",
    //   flex: 1,
    // },
    // {
    //   field: "email",
    //   headerName: "Email",
    //   flex: 1,
    // },
    // {
    //   field: "Percentage",
    //   headerName: "Percentage",
    //   type: "number",
    //   //   headerAlign: "left",
    //   align: "center",
    // },
    {
      field: "branch",
      headerName: "Branch Name",
      flex: 1,
      //   headerAlign: "center",
    },
    {
      field: "course_id",
      headerName: "Course Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "teacher",
      headerName: "Teacher",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "accessLevel",
      headerName: "STATUS",
      flex: 1,
      headerAlign: "center",
      renderCell: ({ row: { status } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              status ? colors.greenAccent[600] : colors.redAccent[400]
            }
            borderRadius="4px"
          >
            <button
              style={{
                border: "none",
                outline: "none",
                backgroundColor: "transparent",
              }}
              onClick={() => {
                status = !status;
              }}
            >
              <Typography
                color={colors.grey[100]}
                sx={{ ml: "5px" }}
                fontStyle={"bold"}
              >
                {status ? `Present` : `Absent`}
              </Typography>
            </button>
          </Box>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Header title="Check Attendance" subtitle="Enter Status or Date ...." />

      {/* {attendanceCreate.error && (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {attendanceCreate.error}
          <strong>check it out!</strong>
        </Alert>
      )} */}

      {/* Search Bar */}

      <Box
        display="flex"
        gap={"30px"}
        my={"10px"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Box flex="1">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Enter Date"
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Box>
        {userLoginDetails.role !== "student" && (
          <>
            <PopupState variant="popover" popupId="demo-popup-menu">
              {(popupState) => (
                <React.Fragment>
                  <Box
                    display="flex"
                    backgroundColor={colors.primary[400]}
                    borderRadius="3px"
                    width={"110px"}
                    // padding = "3px"
                  >
                    <Button variant="flushed" {...bindTrigger(popupState)}>
                      {branch}
                    </Button>
                    <Menu {...bindMenu(popupState)}>
                      {userLoginDetails.branchTeach.map((item, i) => {
                        return (
                          <MenuItem
                            onClick={() => {
                              setBranch(item.branch_id.name);
                              setBranch_id(item.branch_id._id);
                              dispatch(getBranchStudent(item.branch_id.name));
                              popupState.close();
                            }}
                            key={item.branch_id._id}
                          >
                            {item.branch_id.branch_id}
                          </MenuItem>
                        );
                      })}
                    </Menu>
                    <span style={{ marginTop: "15px", marginRight: "8px" }}>
                      <ArrowDropDownIcon></ArrowDropDownIcon>
                    </span>
                  </Box>
                </React.Fragment>
              )}
            </PopupState>

            <PopupState variant="popover" popupId="demo-popup-menu">
              {(popupState) => (
                <React.Fragment>
                  <Box
                    display="flex"
                    backgroundColor={colors.primary[400]}
                    borderRadius="3px"
                    // width={"140px"}
                    // padding = "3px"
                  >
                    <Button variant="flushed" {...bindTrigger(popupState)}>
                      {course}
                    </Button>
                    <Menu {...bindMenu(popupState)}>
                      {courseData &&
                        courseData.courseTeach.map((element) => {
                          return (
                            <MenuItem
                              onClick={() => {
                                setCourse_id(element._id);
                                setCourse(element.name);
                                popupState.close();
                              }}
                              key={element._id}
                            >
                              {element.name}
                            </MenuItem>
                          );
                        })}
                    </Menu>
                    <span style={{ marginTop: "15px", marginRight: "8px" }}>
                      <ArrowDropDownIcon></ArrowDropDownIcon>
                    </span>
                  </Box>
                </React.Fragment>
              )}
            </PopupState>
          </>
        )}
        <PopupState variant="popover" popupId="demo-popup-menu">
          {(popupState) => (
            <React.Fragment>
              <Box
                display="flex"
                backgroundColor={colors.primary[400]}
                borderRadius="3px"
                // width={"140px"}
                // padding = "3px"
              >
                <Button variant="flushed" {...bindTrigger(popupState)}>
                  {status !== "Select Status"
                    ? status
                      ? "Present"
                      : "Absent"
                    : "Select Status"}
                </Button>
                <Menu {...bindMenu(popupState)}>
                  <MenuItem
                    onClick={() => {
                      setStatus(true);
                      popupState.close();
                    }}
                  >
                    Present
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setStatus(false);
                      popupState.close();
                    }}
                  >
                    Absent
                  </MenuItem>
                </Menu>
                <span style={{ marginTop: "15px", marginRight: "8px" }}>
                  <ArrowDropDownIcon></ArrowDropDownIcon>
                </span>
              </Box>
            </React.Fragment>
          )}
        </PopupState>
      </Box>

      {isLoading && (
        <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
          <LinearProgress color="secondary" />
          <LinearProgress color="success" />
          <LinearProgress color="inherit" />
        </Stack>
      )}
      {apiError && (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {apiError}
          <strong> check it out! </strong>
        </Alert>
      )}

      <Box
        m="20px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        {apiError ? (
          <>
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              {apiError}
            </Typography>
          </>
        ) : (
          // <h1>dawgdjawbi</h1>
          <DataGrid
            loading={isLoading}
            checkboxSelection
            rows={apiData}
            columns={columns}
          />
        )}
      </Box>
    </Box>
  );
};

export default CheckAttendence;
