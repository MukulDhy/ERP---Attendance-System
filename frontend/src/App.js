import {  useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
// import Team from "./scenes/team";
// import Invoices from "./scenes/invoices";
// import Contacts from "./scenes/contacts";
// import Bar from "./scenes/bar";
import Form from "./scenes/form";
// import Line from "./scenes/line";
import Pie from "./scenes/pie";
// import FAQ from "./scenes/faq";
// import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
// import Calendar from "./scenes/calendar/calendar";
import LoginPage from "./Screens/Login page/LoginPage";
import { useSelector } from "react-redux";
import './App.css';
import MarkAttendance from "./Screens/markAttendance/MarkAttendance";
import ProfileScreen from "./Screens/ProfileScreen/ProfileScreen";
import CheckAttendence from "./Screens/checkAttendence/CheckAttendence";
import SearchStudent from "./Screens/Student/SearchStudent";
import AddStudent from "./Screens/Student/AddStudent";
import StudentDetails from "./Screens/Student/StudentDetails";


function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const {userLoginDetails} = useSelector(state => state.userLogin);
  // let stylesSidebar = useRef({});
// useEffect(() => {

// }, [isSidebar])


  if(userLoginDetails){
    return (
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            <Sidebar setIsSidebar= {setIsSidebar} isSidebar={isSidebar}  />
            <main className="content" style={!isSidebar ? {marginLeft : "100px" , transition : "0.3s"} : {marginLeft : "280px",transition : "0.3s"  }} >
              <Topbar setIsSidebar={setIsSidebar} />
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/markAttendance" element={<MarkAttendance />} />
                <Route path="/Attendance" element={<CheckAttendence />} />
                <Route path="/profile" element={<ProfileScreen />} />
                <Route path="/students" element={<SearchStudent/>} />
                <Route path="/addStudent" element={<AddStudent/>} />
                <Route path="/students/:id" element={<StudentDetails />} />
                <Route path="/form" element={<Form />} />
                <Route path="/pie" element={<Pie />} />
                {/* <Route path="/team" element={<Team />} /> */}
                {/* <Route path="/contacts" element={<Contacts />} /> */}
                {/* <Route path="/invoices" element={<Invoices />} /> */}
                {/* <Route path="/bar" element={<Bar />} /> */}
                {/* <Route path="/line" element={<Line />} />
                <Route path="/faq" element={<FAQ />} /> */}
                {/* <Route path="/calendar" element={<Calendar />} /> */}
                {/* <Route path="/geography" element={<Geography />} /> */}
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    );
  }else{
    return <LoginPage></LoginPage>
  }
}

export default App;
