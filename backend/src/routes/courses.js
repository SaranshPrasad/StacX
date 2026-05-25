const express = require("express");
const Course = require("../database/models/Course");
const protect = require("../middleware/auth");

const router = express.Router();

router.use(express.json());

router.get("/all", async (req, res) => {
  try {
    const courses = await Course.find();

    if (courses.length === 0) {
      return res.status(200).json({
        success: true,
        message: "Not enough courses to display",
      });
    }

    res.status(200).json({
      success: true,
      courses,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.post("/add", protect, async (req, res) => {
  try {
    const { name, code, totalSemesters } = req.body;

    const course = await Course.findOne({ code });

    if (course) {
      return res.status(400).json({
        success: false,
        message: "Course already exists...",
      });
    }

    const newCourse = new Course({
      name,
      code,
      totalSemesters,
    });

    await newCourse.save();

    res.status(200).json({
      success: true,
      newCourse,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.get("/get/:id", protect, async (req, res) => {
  try {
    const { id } = req.params;

    const course = await Course.findById(id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    res.status(200).json({
      success: true,
      course,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.patch("/update/:id", protect, async (req, res) => {
  try {
    const { id } = req.params;
    const { totalSemesters, name, code } = req.body;

    const course = await Course.findByIdAndUpdate(
      id,
      {
        totalSemesters,
        name,
        code,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      course,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.delete("/delete/:id", protect, async (req, res) => {
  try {
    const { id } = req.params;

    const course = await Course.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      course,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;