//importing libraries
import express from "express";
import cors from "cors";
import { PORT, mongoDB_URL } from "./config.js";
import mongoose from "mongoose";

//importing routes
import adminRoute from "./routes/adminRoute.js";
import userRoute from "./routes/userRoute.js";

//initiating express
const app = express();

app.use(express.json());
app.use(cors());

//*ADMIN ROUTES
app.use("/admin", adminRoute);
//*USER ROUTES
app.use("/users", userRoute);

//connecting to database and listening
mongoose
  .connect(mongoDB_URL, { dbName: "course_website_data" })
  .then(() => {
    console.log("App connected to Database");
    app.listen(PORT, () => {
      console.log(`Server is listening on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
