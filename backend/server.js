// Importing modules
const app = require("./app");
const connectionMongoDb = require("./database/connDataBase");

const studentRoute = require("./routes/studentRoutes");
const teacherRoute = require("./routes/staffRoutes");
const courseRoute = require("./routes/CourseRoutes");
const BranchRoutes = require("./routes/BranchRoutes");
const attendanceRoute = require("./routes/attendanceRoute");
const timeTabelRoute = require("./routes/timeTabelRoute");

const errorMiddleWare = require("./middlewares/errorHandling");
require("colors");

// Database Connection
connectionMongoDb();

// Routes
app.use("/api/student", studentRoute);
app.use("/api/teacher", teacherRoute);
app.use("/api/branch", BranchRoutes);
app.use("/api/attendence", attendanceRoute);
app.use("/api/timeTable", timeTabelRoute);

// Error Handling Middleware
app.use(errorMiddleWare);

// Server Initialization
app.listen(process.env.PORT, "localhost", () => {
  console.log(
    `Server is working on http://localhost:${process.env.PORT}`.underline
      .bgGreen
  );
});

// Handling Unhandled Promise Rejections
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`.underline.bgRed);
  console.log(
    `Shutting down the server due to unhandled promise rejection`.underline
      .bgMagenta.bold
  );
  process.exit(1);
});
