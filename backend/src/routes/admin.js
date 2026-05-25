const express = require("express");
// const nodemailer = require("nodemailer");




const Resources = require("../database/models/Resources");
const User = require("../database/models/User");
const protect = require("../middleware/auth");
const authorizeRoles = require("../middleware/roleMiddleware");
const Course = require("../database/models/Course");
const Subject = require("../database/models/Subject");


const router = express.Router();


// ==========================
// GLOBAL MIDDLEWARE (ADMIN ONLY)
// ==========================
router.use(protect);
router.use(authorizeRoles("admin"));


// ==========================
// GET ALL USERS
// ==========================
router.get("/users", async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.json({
      success: true,
      users,
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});


// ==========================
// PENDING VERIFICATIONS
// ==========================
router.get("/verifications/pending", async (req, res) => {
  try {
    const users = await User.find({ verified: false });

    res.json({
      success: true,
      users,
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});


// ==========================
// VERIFY USER (ACCEPT)
// ==========================
router.post("/verify/:id", async (req, res) => {
  try {

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.verified = true;
    user.verifiedBy = req.user.id;
    user.verifiedAt = new Date();

    await user.save();

    res.json({
      success: true,
      message: "User verified successfully",
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});


// ==========================
// REJECT USER + EMAIL
// ==========================
// router.post("/reject/:id", async (req, res) => {
//   try {

//     const user = await user.findById(req.params.id);

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     // EMAIL SETUP (Nodemailer)
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     await transporter.sendMail({
//       from: process.env.EMAIL_USER,
//       to: user.email,
//       subject: "Account Not Verified",
//       text: `Hello ${user.name}, your account was not verified. Please contact admin.`,
//     });

//     // keep user but mark unverified
//     user.verified = false;
//     await user.save();

//     res.json({
//       success: true,
//       message: "User rejected and email sent",
//     });

//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// });


// ==========================
// GET ALL RESOURCES
// ==========================
router.get("/resources", async (req, res) => {
  try {

    const resources = await Resources.find()
      .populate("uploadedBy", "name email");

    res.json({
      success: true,
      resources,
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});
router.patch(
  "/verify-resource/:id",

  async (req, res) => {
    try {

      const resource =
        await Resources.findByIdAndUpdate(
          req.params.id,
          {
            verified: true,
          },
          { new: true }
        );

      if (!resource) {
        return res.status(404).json({
          success: false,
          message: "Resource not found",
        });
      }

      res.json({
        success: true,
        message: "Resource verified",
        resource,
      });

    } catch (err) {

      console.log(err);

      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  }
);


// ==========================
// DELETE RESOURCE
// ==========================
router.delete("/resource/:id", async (req, res) => {
  try {

    await Resources.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Resource deleted successfully",
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});


// ==========================
// DASHBOARD STATS
// ==========================
router.get("/stats", async (req, res) => {
  try {

    const totalUsers = await User.countDocuments();
    const students = await User.countDocuments({ role: "student" });
    const teachers = await User.countDocuments({ role: "teacher" });

    const resources = await Resources.countDocuments();

    res.json({
      success: true,
      stats: {
        totalUsers,
        students,
        teachers,
        resources,
      },
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});



router.post("/add/subject", async (req,res) => {
  try {
    const {name,code,semester,course} = req.body;
    const subject = await Subject.find({code:code});
    if(subject){
      throw new Error("Subject already exists...");
    }
    const newSubject = new Subject({
      name:name,
      code:code,
      semester:semester,
      course:course
    });
    await newSubject.save();
    res.status(200).json({success: true,newSubject});
  } catch (error) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;