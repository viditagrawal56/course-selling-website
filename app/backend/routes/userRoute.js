import express from "express";

// importing models
import { User } from "../models/userModel.js";
import { Course } from "../models/courseModel.js";
// importing middlewares
import authenticateJWT from "../middlewares/authenticateJWT.js";
import generateJWT from "../middlewares/generateJWT.js";

const router = express.Router();

//USER SIGNUP ROUTE
router.post("/signup", async (req, res) => {
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
router.post("/login", async (req, res) => {
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
router.get("/courses", authenticateJWT, async (req, res) => {
  try {
    const filteredCourses = await Course.find({ published: true });
    res.status(200).json({ courses: filteredCourses });
  } catch (error) {
    res.status(500).json({ error });
  }
});

//USER PURCHASE COURSES ROUTE
router.post("/courses/:courseId", authenticateJWT, async (req, res) => {
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
router.get("/purchasedCourses", authenticateJWT, async (req, res) => {
  const user = await User.findOne({ username: req.user.username }).populate(
    "purchasedCourses"
  );

  if (user && user.purchasedCourses) {
    res.status(200).json({ purchasedCourses: user.purchasedCourses });
  } else {
    res.status(404).json({ message: "NO COURSES PURCHASED" });
  }
});

export default router;
