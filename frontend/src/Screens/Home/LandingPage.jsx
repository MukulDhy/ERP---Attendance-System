import React from "react";
import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import Header from "../../components/Header";
import {Button} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import App from "../../App";
import { Link } from "react-router-dom";

const LandingPage = () => {

  const theme = useTheme();

  const colors = tokens(theme.palette.mode);
  return (
    <>
      <div>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          textAlign="center"
        >
          <Header title="Dronacharya College of Engineering" subtitle="Welcome to your dashboard" />
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          height={"80vh"}
          alignItems="center"
          textAlign="center"
        >
          <Box border={"solid black 2px"}>
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src="https://i.pinimg.com/564x/51/90/10/519010d9ee8167bfe445e616f260f758.jpg" width={"100%"} />
              <Card.Body>                
                <Card.Title>Student Login</Card.Title>
                <Link to={'/student/login'} ><Button type="submit" variant="primary" >Student Login</Button></Link>
              </Card.Body>
            </Card>
          </Box>
          <Box  border={"solid black 2px"} marginX = {'30px'}>
            <Card style={{ width: "18rem"}}>
              <Card.Img variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTH6HeK2zfVlYpnwTQYo6ZM8cFpjJ_Jve57w&usqp=CAU" width={"100%"}/>
              <Card.Body>
                <Card.Title>Staff Login</Card.Title>
                <Link to={'/staff/login'} ><Button type="submit" variant="primary" >Staff Login</Button></Link>
              </Card.Body>
            </Card>
            {/* <Header title="DASHBOARD" subtitle="Welcome to your dashboard" /> */}
          </Box>
          <Box  border={"solid black 2px"}>
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src= "https://thumbs.dreamstime.com/z/admin-icon-vector-male-user-person-profile-avatar-gear-cogwheel-settings-configuration-flat-color-glyph-pictogram-150138136.jpg"  width={"100%"}/>
              <Card.Body>
                <Card.Title>Admin Login</Card.Title>
                <Link to={'/admin/login'} ><Button type="submit" variant="primary" >Staff Login</Button></Link>
              </Card.Body>
            </Card>
            {/* <Header title="DASHBOARD" subtitle="Welcome to your dashboard" /> */}
          </Box>
        </Box>
      </div>
    </>
  );
};

export default LandingPage;
