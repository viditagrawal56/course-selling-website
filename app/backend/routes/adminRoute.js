import express from "express";

// importing models
import { Admin } from "../models/adminModel.js";
import { Course } from "../models/courseModel.js";
// importing middlewares
import authenticateJWT from "../middlewares/authenticateJWT.js";
import generateJWT from "../middlewares/generateJWT.js";

const router = express.Router();

//ADMIN SIGNUP ROUTE
router.post("/signup", async (req, res) => {
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
router.post("/login", async (req, res) => {
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
router.post("/courses", authenticateJWT, async (req, res) => {
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
router.put("/courses/:courseId", authenticateJWT, async (req, res) => {
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

//GET SPECIFIC ADMIN
router.get("/me", authenticateJWT, (req, res) => {
  res.json({
    username: req.user.username,
  });
});

//ADMIN GET COURSES ROUTE
router.get("/courses", authenticateJWT, async (req, res) => {
  const courses = await Course.find({});
  res.status(200).json({ courses });
});

export default router;
