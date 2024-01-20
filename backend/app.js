const express = require("express");
const app = express();
const errorMiddleWare = require("./middlewares/errorHandling");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
require("colors");
/* uncaughtException Error */
/* In this All the undefiend things that occur like */
// console.log(awkd);
process.on("uncaughtException", (err) => {
  console.log(`Error : ${err.message}`.underline.bgRed);
  console.log(`Error : ${err.stack}`.underline.bgYellow);
  console.log(
    `Shutting Down the server due to uncaughtException`.underline.bgMagenta.bold
  );
  process.exit(1);
});

/* .ENV FIlE */
dotenv.config({ path: "backend/config/config.env" });

/* Express Body Parsar */

/* FrontEnd Request Redux Axios */
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());

/* Body Pasrser */
app.use(cookieParser());

/* MiddleWare */
// Error Exceptation
app.use(errorMiddleWare);

/* FrontEnd Request Redux Axios */
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
  });
  
module.exports = app;
