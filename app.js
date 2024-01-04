require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userRoutes = require("./routes/userRoute");
const notesRoute = require("./routes/notesRoute");

//initialize app
const app = express();

//use middleware
app.use(express.json());
app.use(cors());

//routes
app.use("/api/user", userRoutes);
app.use("/api/notes",notesRoute);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server Started at Port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
module.exports = app;
