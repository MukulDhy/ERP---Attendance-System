import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
// import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import FindInPageIcon from "@mui/icons-material/FindInPage";
import { useDispatch, useSelector } from "react-redux";
import { logOutAction } from "../../Redux/actions/user/userAction";
import HowToRegIcon from "@mui/icons-material/HowToReg";
// import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
// import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
// import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
// import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
// import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
// import PeopleOutlinedIcon from "@mui/icons-material/PeopleOut";
// import EditIcon from "@mui/icons-material/Edit";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import AddIcon from "@mui/icons-material/Add";
const Item = ({ title, to, icon, selected, setSelected, logout }) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const colors = tokens(theme.palette.mode);
  const logoutSubmitHandler = (e) => {
    e.preventDefault();
    // console.log("HHHHHHHHHh");
    setSelected(title);
    if (logout) {
      dispatch(logOutAction());
    }
  };
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={logoutSubmitHandler}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = ({ setIsSidebar, isSidebar }) => {
  const { userLoginDetails } = useSelector((state) => state.userLogin);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => {
              setIsCollapsed(!isCollapsed);
              setIsSidebar(!isSidebar);
            }}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
            id="sideBarCollepsed"
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  DCE
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="12px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={`../../Images/avatar/studentAvatar.jpg`}
                  style={{ cursor: "pointer", borderRadius: "40%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {userLoginDetails.name}
                </Typography>
                <Typography variant="h5" marginTop={"4px"} color={colors.greenAccent[500]}>
                  {userLoginDetails.role.toUpperCase()}
                </Typography>
                {userLoginDetails.role === "student" && (
                  <Typography
                    variant="h4"
                    marginY={"5px"}
                    color={colors.primary[200]}
                  >
                    HOD : {userLoginDetails.branchName.hod.name ? userLoginDetails.branchName.hod.name.toUpperCase() : "Not Assign"}
                  </Typography>
                )}
                {userLoginDetails.isHod && (
                  <Box display={"flex"} justifyContent={"space-around"} alignContent={"baseline"} marginTop="5px">
                    <Typography
                      variant="h4"
                      marginY={"5px"}
                      // flex="1"
                      color={colors.primary[200]}
                    >
                      HOD OF :
                    </Typography>

                    <Box display={"flex"} flexDirection="column" >
                      {userLoginDetails.isHod.map((element, i) => {
                        return (
                          <Typography
                            variant="h5"
                            flex="1"
                            color={colors.redAccent[400]}
                          >
                           {element.branch_id}
                          </Typography>
                        );
                      })}
                    </Box>
                  </Box>
                )}
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              logout={false}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Attend
            </Typography>

            <Item
              title="Check Attendance"
              to="/attendance"
              icon={<FindInPageIcon />}
              selected={selected}
              setSelected={setSelected}
              logout={false}
            />
            {
              userLoginDetails.role === 'student' && (
                <Item
                  title="Pie Chart"
                  to="/pie"
                  icon={<PieChartOutlineOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
              )
             }
            {userLoginDetails.role !== "student" && (
              <>
                <Item
                  title="Mark Attendance"
                  to="/markAttendance"
                  icon={<HowToRegIcon />}
                  selected={selected}
                  setSelected={setSelected}
                  logout={false}
                />

                <Typography
                  variant="h6"
                  color={colors.grey[300]}
                  sx={{ m: "15px 0 5px 20px" }}
                >
                  Student
                </Typography>
                {/* <Item
                  title="Update Attendance"
                  to="/updateAttendance"
                  icon={<EditIcon />}
                  selected={selected}
                  setSelected={setSelected}
                  logout={false}
                /> */}
                <Item
                  title="Search Student Detail"
                  to="/students"
                  icon={<ManageSearchIcon />}
                  selected={selected}
                  setSelected={setSelected}
                  logout={false}
                />
                {
                  userLoginDetails.isHod && (
                    <Item
                      title="Add Student"
                      to="/addStudent"
                      icon={<AddIcon />}
                      selected={selected}
                      setSelected={setSelected}
                      logout={false}
                    />
                  )
                }
              </>
            )}

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Profile
            </Typography>
            <Item
              title="Profile"
              to="/profile"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              logout={false}
            />

            {/* <Item
              title="Calendar"
              to="/calendar"
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="FAQ Page"
              to="/faq"
              icon={<HelpOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}

            {/* <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Charts
            </Typography>
            <Item
              title="Bar Chart"
              to="/bar"
              icon={<BarChartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Line Chart"
              to="/line"
              icon={<TimelineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Geography Chart"
              to="/geography"
              icon={<MapOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
            <Item
              title="LogOut"
              to="/"
              icon={<LogoutIcon />}
              selected={selected}
              setSelected={setSelected}
              logout={true}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
