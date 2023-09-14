//importing libraries
import dotenv from "dotenv";
import express from "express";
import jwt from "jsonwebtoken";
import cors from "cors";
import { PORT, mongoDB_URL } from "./config.js";
import mongoose from "mongoose";

//importing models
import { Admin } from "./models/adminModel.js";
import { User } from "./models/userModel.js";
import { Course } from "./models/courseModel.js";

dotenv.config();

//initiating express
const app = express();

app.use(express.json());
app.use(cors());

let ADMINS = []; // ADMIN ARRAY;
let COURSES = []; // COURSE ARRAY;
let USERS = []; // USER ARRAY;

//FUNCTION TO GENERATE A TOKEN PROVIDED THE USERS USERNAME
const generateJWT = (user) => {
  const payload = { username: user.username };
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1h",
  });
};

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1]; //SPLIT THE AUTHHEADER BY THE SPACE AND TAKE THE 1 INDEXED STRING i.e THE TOKEN

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

//*ADMIN ROUTES
//ADMIN SIGNUP ROUTE
app.post("/admin/signup", async (req, res) => {
  const { username, password } = req.body;
  const alreadyExists = await Admin.findOne({ username });
  if (alreadyExists) {
    res.status(403).json({ message: "ADMIN ALREADY EXISTS PLEASE LOGIN!" });
  } else {
    const newAdmin = new Admin({ username, password });
    try {
      await newAdmin.save();
      res.status(200).json({ message: "ADMIN CREATED SUCCESSFULLY" });
    } catch (err) {
      res.status(500).json({ message: "FAILED TO CREATE ADMIN", error: err });
    }
  }
});

//ADMIN LOGIN ROUTE
app.post("/admin/login", async (req, res) => {
  const admin = {
    username: req.headers.username,
    password: req.headers.password,
  };
  const adminExists = await Admin.findOne({
    username: admin.username,
    password: admin.password,
  });

  if (adminExists) {
    const token = generateJWT(admin);
    res.status(200).json({ message: "LOGGED IN SUCCESSFULLY", token });
  } else {
    res.status(403).json({ message: "Invalid Username or Password" });
  }
});

//ADMIN CREATE COURSE ROUTE
app.post("/admin/courses", authenticateJWT, async (req, res) => {
  const newCourse = new Course(req.body);
  try {
    await newCourse.save();
    res
      .status(200)
      .json({ message: "COURSE CREATED SUCCESSFULLY", courseId: newCourse.id });
  } catch (err) {
    res.status(500).json({ message: "FAILED TO CREATE COURSE", error: err });
  }
});

//ADMIN UPDATE COURSE ROUTE
app.put("/admin/courses/:courseId", authenticateJWT, async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.courseId,
      req.body,
      { new: true }
    );
    if (course) {
      res.status(200).json({ message: "COURSE UPDATED SUCCESSFULLY" });
    } else {
      res.status(404).json({ message: "COURSE NOT FOUND" });
    }
  } catch (err) {
    res.status(500).json({ message: "FAILED TO UPDATE COURSE", error: err });
  }
});

//ADMIN GET COURSES ROUTE
app.get("/admin/courses", authenticateJWT, async (req, res) => {
  const courses = await Course.find({});
  res.status(200).json({ courses });
});

//*USER ROUTES

//USER SIGNUP ROUTE
app.post("/users/signup", async (req, res) => {
  const { username, password } = req.body;
  const alreadyExists = await User.findOne({ username });
  if (alreadyExists) {
    res.status(403).json({ message: "USER ALREADY EXISTS PLEASE LOGIN!" });
  } else {
    const newUser = new User({ username, password });
    try {
      await newUser.save();
      res.status(200).json({ message: "USER CREATED SUCCESSFULLY" });
    } catch (err) {
      res.status(500).json({ message: "FAILED TO CREATE USER", error: err });
    }
  }
});

//USER LOGIN ROUTE
app.post("/users/login", async (req, res) => {
  const user = {
    username: req.headers.username,
    password: req.headers.password,
  };

  const userExists = await User.findOne({
    username: user.username,
    password: user.password,
  });

  if (userExists) {
    const token = generateJWT(user);
    res.status(200).json({ message: "USER LOGGED IN SUCCESSFULLY", token });
  } else {
    res.status(403).json({ message: "Invalid Username or Password" });
  }
});

//USER GET COURSES ROUTE
app.get("/users/courses", authenticateJWT, async (req, res) => {
  try {
    const filteredCourses = await Course.find({ published: true });
    res.status(200).json({ courses: filteredCourses });
  } catch (error) {
    res.status(500).json({ error });
  }
});

//USER PURCHASE COURSES ROUTE
app.post("/users/courses/:courseId", authenticateJWT, async (req, res) => {
  const course = await Course.findOne({
    _id: req.params.courseId,
    published: true,
  });
  if (course) {
    const user = await User.findOne({ username: req.user.username });
    if (user) {
      user.purchasedCourses.push(course);
      try {
        await user.save();
        res.status(200).json({ message: "COURSE PURCHASED SUCCESSFULLY" });
      } catch (error) {
        res.status(500).json({ error });
      }
    } else {
      res.status(403).json({ message: "USER NOT FOUND" });
    }
  } else {
    res.status(404).json({ message: "COURSE NOT FOUND" });
  }
});

//USER GET PURCHASED COURSES ROUTE
app.get("/users/purchasedCourses", authenticateJWT, async (req, res) => {
  const user = await User.findOne({ username: req.user.username }).populate(
    "purchasedCourses"
  );

  if (user && user.purchasedCourses) {
    res.status(200).json({ purchasedCourses: user.purchasedCourses });
  } else {
    res.status(404).json({ message: "NO COURSES PURCHASED" });
  }
});

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
