import { Box, Button, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
// import { MenuItem } from "react-pro-sidebar";
// import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
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

const ProfileScreen = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [update] = useState(false);

  const { userLoginDetails } = useSelector((state) => state.userLogin);
  // const [selected, setSelected] = useState("");
  const handleFormSubmit = (values) => {
    console.log(values);
  };

  const initialValues = {
    FullName: userLoginDetails.name,
    // email: "",
    RollNo: userLoginDetails.rollNo
      ? userLoginDetails.rollNo
      : userLoginDetails.staff_Id,
    password: "",
    branchName: userLoginDetails.branchName
      ? userLoginDetails.branchName.name
      : "",
  };

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // const [ toDoListBranch, setToDoListBranch ] = useState(userLoginDetails.branchTeach);

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
    <Box m="20px 150px">
      <Header title="Profile Screen" subtitle="" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
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
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.FullName}
                name="FullName"
                error={!!touched.FullName && !!errors.FullName}
                helperText={touched.FullName && errors.FullName}
                sx={{ gridColumn: "span 4" }}
              />
              {/* <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              /> */}
              <TextField
                fullWidth
                disabled={!update}
                variant="filled"
                type="text"
                label="Roll Number or Id"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.RollNo}
                name="RollNo"
                error={!!touched.RollNo && !!errors.RollNo}
                helperText={touched.RollNo && errors.RollNo}
                sx={{ gridColumn: "span 4" }}
              />
              {update && (
                <>
                  <TextField
                    fullWidth
                    variant="filled"
                    type="password"
                    label="Password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                    name="password"
                    error={!!touched.password && !!errors.password}
                    helperText={touched.password && errors.password}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="password"
                    label="confirm Password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                    name="password"
                    error={!!touched.password && !!errors.password}
                    helperText={touched.password && errors.password}
                    sx={{ gridColumn: "span 4" }}
                  />
                </>
              )}
              {userLoginDetails.role === "student" && (
                <TextField
                  disabled={
                    userLoginDetails.role === "student" ? true : !update
                  }
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Branch Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.branchName}
                  name="BranchName"
                  error={!!touched.branchName && !!errors.branchName}
                  helperText={touched.branchName && errors.branchName}
                  sx={{ gridColumn: "span 4" }}
                />
              )}
            </Box>

            {userLoginDetails.role === "student" && (
              // <>

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

                {userLoginDetails.branchName.courses.map((key) => {
                  return (
                    //  <Button endIcon={<AddIcon />} key = {key._id}>Add</Button>
                    <Button
                      variant="primary"
                      disabled={
                        userLoginDetails.role === "student" ? true : !update
                      }
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
            )}

            <Box
              bgcolor={"#4b62b154"}
              borderRadius="20px"
              padding="15px"
              margin="20px"
            >
              {userLoginDetails.role === "staff" && (
                <Typography
                  variant="h5"
                  fontWeight="600"
                  margin={"15px 25px"}
                  color={colors.greenAccent[400]}
                >
                  Branch Teach
                </Typography>
              )}

              <Box padding="0px 50px">
                {userLoginDetails.role === "staff" &&
                  userLoginDetails.branchTeach.map((key) => {
                    return (
                      <>
                        <Typography
                          variant="h5"
                          fontWeight="900"
                          color={colors.redAccent[400]}
                        >
                          {key.branch_id.name}
                        </Typography>

                        {key.courseTeach.map((element) => {
                          return (
                            <>
                              <Button
                                variant="primary"
                                disabled={
                                  userLoginDetails.role === "student"
                                    ? true
                                    : !update
                                }
                                style={{
                                  margin: "0px 15px",
                                }}
                                key={element._id}
                              >
                                {element.name}
                                <IconButton>
                                  <DeleteIcon />
                                </IconButton>
                              </Button>
                            </>
                          );
                        })}

                        {/* <Button endIcon={<AddIcon />} key = {key._id}>Add</Button> */}
                        <Button
                          variant="primary"
                          disabled={
                            userLoginDetails.role === "student" ? true : !update
                          }
                          style={{
                            margin: "0px 15px",
                          }}
                          key={key.branch_id._id}
                        >
                          {key.branch_id.name}
                          <IconButton>
                            <DeleteIcon />
                          </IconButton>
                        </Button>
                      </>
                    );
                  })}
              </Box>
            </Box>

            <Box display="flex" justifyContent="end" mt="20px">
              {/* <Button type="submit" color="secondary" variant="contained">
                Create New User
              </Button> */}

              {/* <Button
                variant={update ? "danger" : "primary"}
                className="my-3"
                onClick={() => setUpdate(!update)}
              >
                {" "}
                Update Profile
              </Button> */}
              {update && (
                <></>
                // <Button
                //   type="submit"
                //   variant="primary"
                //   className="mx-3"
                //   style={{
                //     color: "#fff",
                //     background: "#d9534f",
                //   }}
                // >
                //   Submit
                // </Button>
              )}
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  FullName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  RollNo: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  password: yup.string().required("required"),
  branchName: yup.string().required("required"),
});

export default ProfileScreen;
