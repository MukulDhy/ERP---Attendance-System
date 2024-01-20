import React, { useEffect, useState } from "react";
// import './markAttendance.css';
// import './attendence.css'
import {useNavigate} from 'react-router-dom';
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridEventListener } from "@mui/x-data-grid";
import { tokens } from "../../theme";
// import { mockDataTeam } from "../../data/mockData";
// import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
// import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
// import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import { IconButton } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
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
import { getBranchStudent } from "../../Redux/actions/branch/branchAction";
import { attendanceCreateAction } from "../../Redux/actions/attendance/attendanceAction";
// import Loading from "../../scenes/Loader/Loading";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";

// import { Dayjs } from "dayjs";
// import { FormControl } from "@mui/material";
// import { InputLabel } from "@mui/material";
// import { Input } from "@mui/material";
// import { FormHelperText } from "@mui/material";

const MarkAttendance = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  //   const [value, setValue] = (React.useState < Dayjs) | (null > null);
  
  // var today = new Date();
  // var dd = String(today.getDate()).padStart(2, '0');
  // var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  // var yyyy = today.getFullYear();

// today = mm + '/' + dd + '/' + yyyy;
var utc = new Date().toJSON().slice(0,10).replace(/-/g,'/');
// document.write(utc);
  // const [value, setValue] = useState([dd, mm, yyyy]);
  const [value, setValue] = useState(utc);
  //   const [status, setStatus] = useState(false);
  // console.log(value);
  const date = new Date(value);
  // console.log(date);
  const [branch, setBranch] = useState("Select Branch");
  const [course, setCourse] = useState("Select Course");

  const { userLoginDetails } = useSelector((state) => state.userLogin);

  const { loading, allBranchStudent, error } = useSelector(
    (state) => state.branchStudent
  );

  const attendanceCreate = useSelector((state) => state.attendenceCreate);
  // console.log(attendanceCreate);
  // console.log(allBranchStudent);
  allBranchStudent.forEach((val, i) => {
    val.id = i + 1;
    val.branchName = branch;
    val.status = true;
  });

  //   useEffect(() => {

  // }, [allBranchStudent]);

  const dispatch = useDispatch();

  // console.log(value.$d);
  const attendanceSubmitHandel = (e) => {
    if (branch === "Select Branch" || course === "Select Course") {
      alert("Please Enter All Details");
      return;
    }
    const attendanceData = {
      branchName: branch,
      courseTeach: course,
      date: date,
      allStudent: allBranchStudent,
    };
    if (window.confirm("Are You Sure Details are Corret") === true) {
      dispatch(attendanceCreateAction(attendanceData));
    }
    // console.log(attendanceData);
    e.preventDefault();
  };

  const handleRowClick: GridEventListener<"cellClick"> = (params) => {
    // setMessage(` "${params.row.title}" clicked`);
    params.row.status = !params.row.status;
  };

  const courseData = userLoginDetails.branchTeach.find((item) => {
    // console.log(item.branch_id.name)
    return item.branch_id.name === branch;
  });

  const Navigate = useNavigate();
  // console.log(courseData)
  useEffect(() => {
    if(userLoginDetails.role === 'student'){
      Navigate('/');
      return;
    }

    if (branch) {
      setCourse("Select Course");
    }
  }, [courseData, branch,Navigate,userLoginDetails]);

  const searchHandelBar = (e) => {
    e.preventDefault();
  };

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
      field: "branchName",
      headerName: "Branch Name",
      flex: 1,
      //   headerAlign: "center",
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
      <Header
        title="Attendance"
        subtitle="Mark the Attendance Enter Branch and Date ...."
      />

      {attendanceCreate.error && (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {attendanceCreate.error}
          <strong>check it out!</strong>
        </Alert>
      )}

      {/* Search Bar */}
      <Box display="flex" gap={"30px"} my = {"10px"}>
        <Box
          display="flex"
          backgroundColor={colors.primary[400]}
          borderRadius="3px"
          width={"50%"}
          //   height = {"40px"}
        >
          <InputBase
            sx={{ ml: 3, flex: 1 }}
            placeholder="Search Student with name and Roll Number"
            onChange={searchHandelBar}
          />
          <IconButton type="button" sx={{ pr: 2 }}>
            <SearchIcon />
          </IconButton>
        </Box>

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

        <Box flex="1">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              // disabled= {true}
              label="Enter Date"
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Box>
      </Box>

      <Box
        //   display="flex"
        marginTop="25px"
        marginBottom="15px"
        // m={"auto"}
        textAlign="center"
        //   justifyContent = "center"
        //   backgroundColor={colors.greenAccent[400]}
        borderRadius="5px"
        //   width={"50%/"}
      >
        <Button
          variant="flushed"
          onClick={attendanceSubmitHandel}
          style={{
            backgroundColor: "",
            color: "#70d8bd",
            fontWeight: "bold",
            fontSize: "20px",
            width: "240px",
          }}
        >
          Submit
        </Button>
      </Box>

      {attendanceCreate.loading && (
        <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
          <LinearProgress color="secondary" />
          <LinearProgress color="success" />
          <LinearProgress color="inherit" />
        </Stack>
      )}
      {attendanceCreate.message && (
        <Alert severity="success">
          <AlertTitle>{attendanceCreate.successs}</AlertTitle>
          {attendanceCreate.message}
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
            fontSize:"16px",
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
        {error ? (
          <>
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              {error}
            </Typography>
          </>
        ) : (
          <DataGrid
            onRowClick={handleRowClick}
            {...allBranchStudent}
            loading={loading}
            checkboxSelection
            rows={allBranchStudent}
            columns={columns}
            experimentalFeatures={{ newEditingApi: true }}
          />
        )}
      </Box>
    </Box>
  );
};

export default MarkAttendance;
