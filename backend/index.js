const express = require("express");
const mongoose = require("mongoose");

// Routers
const authRouter = require("./api/routes/auth.route.js");

// Middleware
const app = express();
app.use(express.json());
app.use("/api/auth", authRouter);

// Connect to database
mongoose
  .connect("mongodb://localhost:27017/demoDatabase")
  .then(() => {
    console.log("Connected to database");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch(() => {
    console.log("Error connecting to database");
  });
