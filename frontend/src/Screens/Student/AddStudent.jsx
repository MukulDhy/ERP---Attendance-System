import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
// import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState, useEffect } from "react";
import axios from "axios";
// import { Dropdown } from "react-bootstrap";
// import { DropdownButton } from "react-bootstrap";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Alert, LinearProgress } from "@mui/material";

const AddStudent = () => {
  const theme = createTheme();
  const [branch, setBranch] = useState("");
  const [error, setError] = useState(false);

  function timeOutFunction() {
    setError(false);
    setApiError(false);
  }

  const [isLoading, setIsLoading] = useState(false);
  const [apiData, setApiData] = useState([]);
  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    async function fetchData(requestString, data) {
      try {
        // console.log(apiData);

        const config = { headers: { "Content-Type": "application/json" } };
        const response = await axios.get(requestString, data, config);
        setApiData(response.data.branches);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData("/api/branch/", null);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get("password") !== data.get("confirmPassword")) {
      setError("Password is not Mathed");
      setTimeout(timeOutFunction, 3000);
      return;
    }
    
    async function fetchData(requestString, data) {
      try {
        // console.log(apiData);
        setIsLoading(true);
        const config = { headers: { "Content-Type": "application/json" } };
        await axios.post(requestString, data, config);
        setIsLoading(false);
        setApiError("Successfully Student is Added in DataBase");

      } catch (error) {
        setError(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        );
        setIsLoading(false);
      }
      setTimeout(timeOutFunction,6000);
    }

    fetchData("/api/student/new", {
      name:data.get("name"),
      email: data.get("email"),
      password: data.get("password"),
      rollNo: data.get("rollNo"),
      branchName: branch,
      parentsNumber: data.get("parentsNumber"),
      fatherName: data.get("fatherName"),
      studentNumber: data.get("studentNumber"),
    });

  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box marginX={"100px"}>
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Create Student
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Box marginY={"10px"}>
            {isLoading && <LinearProgress></LinearProgress>}
          {error && <Alert severity="warning">{error}</Alert>}
          {apiError && <Alert severity="success">{apiError}</Alert>}

            </Box>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="name"
                required
                fullWidth
                id="name"
                label="Full Name"
                autoFocus
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="rollNo"
                label="Roll Number"
                name="rollNo"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="given-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="studentNumber"
                label="Student Number"
                name="studentNumber"
                autoComplete="given-name"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="fatherName"
                required
                fullWidth
                id="fatherName"
                label="Father Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="parentsNumber"
                label="Father Number"
                name="parentsNumber"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel id="demo-simple-select-label">
                Select Branch
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={branch}
                // label="dwankdk"
                required={true}
                fullWidth={"200px"}
              >
                {apiData &&
                  apiData.map((key, i) => {
                    return (
                      <MenuItem
                        onClick={() => setBranch(key.name)}
                        value={key.name}
                        key={i}
                      >
                        {key.name}
                      </MenuItem>
                    );
                  })}
              </Select>
            </Grid>
            {/* <Grid item xs={12}>
              <DropdownButton
                id="dropdown-basic-button"
                title="Dropdown button"
              >
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </DropdownButton>
            </Grid> */}
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="All Details are correct.. Proceed to Register"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Create Student
          </Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default AddStudent;
