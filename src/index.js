const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const process = require("process");

const app = express();

const allowedOrigins = [
  "https://booknest.web.id",
  "https://fe-final-project-paw10.vercel.app",
];

// DOTENV CONFIG
dotenv.config();

// MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan("dev"));

// CORS
app.use(
  cors({
    origin: (origin, callback) => {
      // Check if the origin is in the allowed origins list
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Allows cookies to be sent with requests
  }),
);

// DB CONNECTION
if (!process.env.MONGODB_URI) {
  throw Error("Database connection string not found");
}

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Failed to connect to the database");
    console.log("Error: ", err);
  });

// ROUTES
app.get("/", (req, res) => {
  res.send("Welcome to PAW 10 Backend Service");
});

app.use("/auth", require("./routes/authentication"));
app.use("/books", require("./routes/book"));
app.use("/records", require("./routes/record"));

// APP LISTEN
app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});
