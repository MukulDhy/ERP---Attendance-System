import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { IconButton } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useDispatch, useSelector } from "react-redux";
// import TextField from "@mui/material/TextField";
// import './attendence.css'
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import Loading from "../../scenes/Loader/Loading";
// import './SearchStudent.css';
// import Alert from "@mui/material/Alert";
// import AlertTitle from "@mui/material/AlertTitle";
// import Stack from "@mui/material/Stack";
// import LinearProgress from "@mui/material/LinearProgress";
// import { getBranchStudent } from "../../Redux/actions/branch/branchAction";
// import { mockDataTeam } from "../../data/mockData";
// import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
// import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
// import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
// import useFetch from "../../Fetch Data/useFetch";
import { getAllStudentAction } from "../../Redux/actions/user/userAction";
// import axios from "axios";


const SearchStudent = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [keyword, setKeyword] = useState(null);
  const [branch, setBranch] = useState("Select Branch");

  const [branch_id, setBranch_id] = useState(null);

  const { userLoginDetails } = useSelector((state) => state.userLogin);

  const navigate = useNavigate();

  const handleRowClick: GridEventListener<"rowClick"> = (params) => {
    // setMessage(` "${params.row.title}" clicked`);
    // console.log(params);
    // params.row.status = !params.row.status;
    navigate(`${params.row._id}`);
  };

  //   const { isLoading, apiData, apiError } = useFetch('/api/branch',null);

  const { loading, allStudent, error } = useSelector(
    (state) => state.getAllStudentData
  );

//   console.log(allStudent);

  const dispatch = useDispatch();

  allStudent.forEach((val, i) => {
    val.id = i + 1;
    val.branch = val.branchName.branch_id;
  });

  const searchHandelBar = (e) => {
    setKeyword(e.target.value);

    // console.log(keyword);
    dispatch(
      getAllStudentAction({
        params: { keyword: keyword, branchName: branch_id ? branch_id : null },
      })
    );
    e.preventDefault();
  };

  // const [apiData, setApiData] = useState([]);

  //   console.log(apiData);
  useEffect(() => {
    if (userLoginDetails.role === "student") {
      navigate("/");
    }
    if (branch_id) {
      // console.log(branch_id);
      // console.log(keyword);
      dispatch(
        getAllStudentAction({
          params: {
            keyword: keyword,
            branchName: branch_id ? branch_id : null,
          },
        })
      );
    }

    // async function fetchData(requestString, data) {
    //   try {
    //     // console.log(apiData);

    //     const config = { headers: { "Content-Type": "application/json" } };
    //     const response = await axios.get(requestString, data, config);
    //     setApiData(response.data.branches);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
    // fetchData("/api/branch/", null);
    

    // async function fetchData() {
    //     const {data} = await axios.get('/api/branch');
    //     setApiData(data);
    // }
    // fetchData();
  }, [navigate, userLoginDetails.role, keyword, dispatch, branch_id]);

  // console.log(allStudent);

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
    {
      field: "email",
      headerName: "Email ID",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
        field: "fatherName",
        headerName: "Father Name",
        flex: 1,
        cellClassName: "name-column--cell",
    },
    {
        field: "studentNumber",
        headerName: "Mobile Number",
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
    // {
    //   field: "course_id",
    //   headerName: "Course Name",
    //   flex: 1,
    //   cellClassName: "name-column--cell",
    // },
    // {
    //   field: "date",
    //   headerName: "Date",
    //   flex: 1,
    //   cellClassName: "name-column--cell",
    // },
    // {
    //   field: "teacher",
    //   headerName: "Teacher",
    //   flex: 1,
    //   cellClassName: "name-column--cell",
    // },
    // {
    //   field: "accessLevel",
    //   headerName: "STATUS",
    //   flex: 1,
    //   headerAlign: "center",
    //   renderCell: ({ row: { status } }) => {
    //     return (
    //       <Box
    //         width="60%"
    //         m="0 auto"
    //         p="5px"
    //         display="flex"
    //         justifyContent="center"
    //         backgroundColor={
    //           status ? colors.greenAccent[600] : colors.redAccent[400]
    //         }
    //         borderRadius="4px"
    //       >
    //         <button
    //           style={{
    //             border: "none",
    //             outline: "none",
    //             backgroundColor: "transparent",
    //           }}
    //           onClick={() => {
    //             status = !status;
    //           }}
    //         >
    //           <Typography
    //             color={colors.grey[100]}
    //             sx={{ ml: "5px" }}
    //             fontStyle={"bold"}
    //           >
    //             {status ? `Present` : `Absent`}
    //           </Typography>
    //         </button>
    //       </Box>
    //     );
    //   },
    // },
  ];

  return (
    <Box m="20px">
      <Header title="Search Student" subtitle="see student details...." />

      {/* Search Bar */}

      <Box
        display="flex"
        gap={"30px"}
        my={"10px"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Box
          display="flex"
          backgroundColor={colors.primary[400]}
          borderRadius="3px"
          width={"50%"}
          //   height = {"40px"}
        >
          <InputBase
            sx={{ ml: 3, flex: 1 }}
            placeholder="Search Student with name and Roll Number...."
            onChange={searchHandelBar}
          />
          <IconButton type="button" sx={{ pr: 2 }}>
            <SearchIcon />
          </IconButton>
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

                    {/* {userLoginDetails.isHod ? (
                      <Menu {...bindMenu(popupState)}>
                        {apiData &&
                          apiData.branches.map((item, i) => {
                            return (
                              <MenuItem
                                onClick={() => {
                                  setBranch(item.branch_id.name);
                                  setBranch_id(item.branch_id._id);
                                  popupState.close();
                                }}
                                key={item.branch_id._id}
                              >
                                {item.branch_id.name}
                              </MenuItem>
                            );
                          })}
                      </Menu>
                    ) : (
                      <Menu {...bindMenu(popupState)}>
                        {userLoginDetails.branchTeach &&
                          userLoginDetails.branchTeach.map((item, i) => {
                            return (
                              <MenuItem
                                onClick={() => {
                                  setBranch(item.branch_id.name);
                                  setBranch_id(item.branch_id._id);
                                  popupState.close();
                                }}
                                key={item.branch_id._id}
                              >
                                {item.branch_id.name}
                              </MenuItem>
                            );
                          })}
                      </Menu>
                    )} */}

                    {userLoginDetails.role === 'staff' && (
                      <Menu {...bindMenu(popupState)}>
                        {userLoginDetails.branchTeach &&
                          userLoginDetails.branchTeach.map((item, i) => {
                            return (
                              <MenuItem
                                onClick={() => {
                                  setBranch(item.branch_id.name);
                                  setBranch_id(item.branch_id._id);
                                  popupState.close();
                                }}
                                key={item.branch_id._id}
                              >
                                {item.branch_id.name}
                              </MenuItem>
                            );
                          })}
                      </Menu>
                    )}

                    <span style={{ marginTop: "15px", marginRight: "8px" }}>
                      <ArrowDropDownIcon></ArrowDropDownIcon>
                    </span>
                  </Box>
                </React.Fragment>
              )}
            </PopupState>
          </>
        )}
      </Box>

      {/* {isLoading && (
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
      )} */}

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
          // <h1>dawgdjawbi</h1>
          <DataGrid
          onRowClick={handleRowClick}
            loading={loading}
            checkboxSelection
            rows={allStudent}
            columns={columns}
          />
        )}
      </Box>
    </Box>
  );
};

export default SearchStudent;
