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
app.post("/admin/signup", (req, res) => {
  const alreadyExists = ADMINS.find((a) => a.username == req.body.username);
  if (alreadyExists) {
    res.status(403).json({ message: "ADMIN ALREADY EXISTS PLEASE LOGIN!" });
  } else {
    const admin = req.body;
    ADMINS.push(admin);
    res.status(200).json({ message: "ADMIN CREATED SUCCESSFULLY" });
  }
});

//ADMIN LOGIN ROUTE
app.post("/admin/login", (req, res) => {
  const admin = {
    username: req.headers.username,
    password: req.headers.password,
  };
  const adminExists = ADMINS.find(
    (a) => a.username === admin.username && a.password === admin.password
  );
  if (adminExists) {
    const token = generateJWT(admin);
    res.status(200).json({ message: "LOGGED IN SUCCESSFULLY", token });
  } else {
    res.status(401).json({ message: "ADMIN AUTHENTICATION FAILED" });
  }
});

//ADMIN CREATE COURSE ROUTE
app.post("/admin/courses", authenticateJWT, (req, res) => {
  const newCourse = req.body;
  newCourse.id = COURSES.length + 1;
  COURSES.push(newCourse);
  res.status(200).json({ message: "COURSE CREATED SUCCESSFULLY" });
});

//ADMIN UPDATE COURSE ROUTE
app.put("/admin/courses/:courseId", authenticateJWT, (req, res) => {
  const id = parseInt(req.params.courseId);
  const index = COURSES.findIndex((c) => c.id === id);

  if (index > -1) {
    const updatedCourse = { ...COURSES[index], ...req.body };
    COURSES[index] = updatedCourse;
    res.status(200).json({ message: "COURSE UPDATED SUCCESSFULLY" });
  } else {
    res.status(404).json({ message: "COURSE NOT FOUND" });
  }
});

//USER GET COURSES ROUTE
app.get("/admin/courses", authenticateJWT, (req, res) => {
  res.status(200).json({ courses: COURSES });
});

//*USER ROUTES

//USER SIGNUP ROUTE
app.post("/users/signup", (req, res) => {
  const alreadyExists = USERS.find(
    (u) => u.username === req.body.username && u.password === req.body.password
  );
  if (alreadyExists) {
    res.status(403).json({ message: "USER ALREADY EXISTS" });
  } else {
    const newUser = req.body;
    USERS.push(newUser);
    res
      .status(200)
      .json({ users: USERS, message: "USER CREATED SUCCESSFULLY" });
  }
});

//USER LOGIN ROUTE
app.post("/users/login", (req, res) => {
  const user = {
    username: req.headers.username,
    password: req.headers.password,
  };

  const userExists = USERS.find(
    (u) => u.username === user.username && u.password === user.password
  );
  if (userExists) {
    const token = generateJWT(user);
    res.status(200).json({ message: "USER LOGGED IN SUCCESSFULLY", token });
  } else {
    res.status(401).json({ message: "USER AUTHENTICATION FAILED" });
  }
});

//USER GET COURSES ROUTE
app.get("/users/courses", authenticateJWT, (req, res) => {
  let filteredCourses = COURSES.filter((c) => c.published);
  res.status(200).json({ courses: filteredCourses });
});

//USER PURCHASE COURSES ROUTE
app.post("/users/courses/:courseId", authenticateJWT, (req, res) => {
  const id = parseInt(req.params.courseId);
  const course = COURSES.find((c) => c.id === id);

  if (course) {
    const user = USERS.find((u) => u.username === req.user.username);
    if (user) {
      user.purchasedCourses = user.purchasedCourses
        ? user.purchasedCourses
        : [];
      user.purchasedCourses.push(course);
      res.status(200).json({ message: "COURSE PURCHASED SUCCESSFULLY" });
    } else {
      res.status(403).json({ message: "USER NOT FOUND" });
    }
  } else {
    res.status(404).json({ message: "COURSE NOT FOUND" });
  }
});

//USER GET PURCHASED COURSES ROUTE
app.get("/users/purchasedCourses", authenticateJWT, (req, res) => {
  const user = USERS.find((u) => (u.username = req.user.username));
  if (user && user.purchasedCourses) {
    res.status(200).json({ purchasedCourses: user.purchasedCourses });
  } else {
    res.status(404).json({ message: "NO COURSES PURCHASED" });
  }
});

mongoose
  .connect(mongoDB_URL)
  .then(() => {
    console.log("App connected to Database");
    app.listen(PORT, () => {
      console.log(`Server is listening on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
