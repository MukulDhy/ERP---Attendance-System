import { Box, Button, TextField, Typography } from "@mui/material";
// import { Formik } from "formik";
// import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
// import { MenuItem } from "react-pro-sidebar";
// import { Link } from "react-router-dom";
// import IconButton from "@mui/material/IconButton";
// import DeleteIcon from "@mui/icons-material/Delete";
import { useLocation } from "react-router-dom";
import { singleStudentDeatilAction } from "../../Redux/actions/user/userAction";
// import HowToRegIcon from '@mui/icons-material/HowToReg';
// import AddIcon from "@mui/icons-material/Add";
// const Item = ({ title, to, icon, selected, setSelected, logout }) => {
//   const theme = useTheme();
//   // const dispatch = useDispatch();

//   const colors = tokens(theme.palette.mode);
//     const logoutSubmitHandler = (e) => {
//       e.preventDefault();
//       // console.log("HHHHHHHHHh");
//       setSelected(title);

//   }
//   return (
//     <MenuItem
//       active={selected === title}
//       style={{
//         color: colors.grey[100],
//       }}
//       onClick={logoutSubmitHandler}
//       icon={icon}
//     >
//       <Typography>{title}</Typography>
//       <Link to={to} />
//     </MenuItem>
//   );
// };

const StudentDetails = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const update = useState(true);
  const location = useLocation();
  // const [selected, setSelected] = useState("");

//   const { userLoginDetails } = useSelector((state) => state.userLogin);
  const { studentDetail } = useSelector(
    (state) => state.getSingleStudent
  );
  const dispatch = useDispatch();

//   const handleFormSubmit = (values) => {
//     console.log(values);
//   };

  //   console.log(location.pathname.split('/')[2]);
  useEffect(() => {
    dispatch(singleStudentDeatilAction(location.pathname.split("/")[2]));
  }, [dispatch, location.pathname]);

  console.log(studentDetail);

  //   const initialValues = {
  //     FullName: studentDetail.name,
  //     email: studentDetail.email,

  //     RollNo: studentDetail.rollNo,
  //     // email: "",
  //     password: "",
  //     branchName: studentDetail.branchName ? studentDetail.branchName.name : "",
  //   };

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // const [ toDoListBranch, setToDoListBranch ] = useState(studentDetail.branchTeach);

  // const [ toDoListCourse, setToDoListCourse ] = useState(toDoListBranch.courseTeach);

  // const handleToggle = (id) => {
  //   let mapped = toDoListBranch.map(task => {
  //     return task.id === Number(id) ? { ...task, complete: !task.complete } : { ...task};
  //   });
  //   setToDoListBranch(mapped);
  // }

  // const handleFilter = () => {
  //   let filtered = toDoListBranch.map.filter(task => {
  //     return !task.name;
  //   });
  //   console.log("hjahjsdbaj")
  //   setToDoListBranch(filtered);
  // }

  // const addTask = (userInput ) => {
  //   let copy = [...toDoListBranch];
  //   copy = [...copy, { id: toDoListBranch.length + 1, task: userInput, complete: false }];
  //   setToDoListBranch(copy);
  // }

  return (
    <Box marginX={"150px"} marginBottom="60px">
      <Header title={`${studentDetail.name} Details`} subtitle="" />

      <div>
        <Box
          display="grid"
          gap="30px"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          <TextField
            disabled={!update}
            fullWidth
            variant="filled"
            type="text"
            label="Full Name"
            value={studentDetail.name}
            name="FullName"
            sx={{ gridColumn: "span 4" }}
          />
          <TextField
            disabled={!update}
            fullWidth
            variant="filled"
            type="text"
            label="Roll Number"
            value={studentDetail.rollNo}
            name="FullName"
            sx={{ gridColumn: "span 4" }}
          />
          <TextField
            disabled={!update}
            fullWidth
            variant="filled"
            type="text"
            label="Full Name"
            value={studentDetail.email}
            name="FullName"
            sx={{ gridColumn: "span 4" }}
          />
          <TextField
            disabled={!update}
            fullWidth
            variant="filled"
            type="text"
            label="Father Name"
            value={studentDetail.fatherName}
            name="FullName"
            sx={{ gridColumn: "span 4" }}
          />
          <TextField
            disabled={!update}
            fullWidth
            variant="filled"
            type="text"
            label="Student Number"
            value={studentDetail.studentNumber}
            name="FullName"
            sx={{ gridColumn: "span 4" }}
          />
          <TextField
            disabled={!update}
            fullWidth
            variant="filled"
            type="text"
            label="Branch Name"
            value={studentDetail.branchName ? studentDetail.branchName.name : " "}
            name="FullName"
            sx={{ gridColumn: "span 4" }}
          />
          <TextField
            disabled={!update}
            fullWidth
            variant="filled"
            type="text"
            label="Father Number"
            value={studentDetail.parentsNumber}
            name="FullName"
            sx={{ gridColumn: "span 4" }}
          />
          
        </Box>

        <Box
          display="flex"
          bgcolor={"#4b62b154"}
          borderRadius="20px"
          padding="15px"
          margin="20px"
          flexWrap={"wrap"}
        >
          <Typography
            flex="1"
            flexBasis="100%"
            variant="h5"
            fontWeight="600"
            margin={"15px 25px"}
            color={colors.grey[100]}
          >
            Course Taken
          </Typography>

          {studentDetail.branchName &&
            studentDetail.branchName.courses.map((key) => {
              return (
                //  <Button endIcon={<AddIcon />} key = {key._id}>Add</Button>
                <Button
                  variant="primary"
                  disabled={true}
                  style={{
                    margin: "0px 15px",
                  }}
                  key={key._id}
                >
                  {key.name}
                  {/* <IconButton> */}
                  {/* <DeleteIcon/> */}
                  {/* </IconButton> */}
                </Button>
              );
            })}
        </Box>
      </div>
    </Box>
  );
};

export default StudentDetails;
