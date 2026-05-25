const express = require("express");
const protect = require("../middleware/auth");
const authorizeRoles = require("../middleware/roleMiddleware");
const User = require("../database/models/User")


const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// ==========================
// GET MY PROFILE
// ==========================
router.get("/me", protect, async (req, res) => {
  try {

    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      user,
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});


// ==========================
// UPDATE PROFILE
// ==========================
// router.patch("/update", protect, async (req, res) => {
//   try {

//     const data = req.body;

//     const user = await User.findById(req.user.id);

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     if (data?.name) user.name = name;
//     if (data?.avatar) user.avatar = data?.avatar;
//     if (data?.course) user.course = course;
//     if (data?.semester) user.semester = semester;

//     await user.save();

//     res.json({
//       success: true,
//       message: "Profile updated successfully",
//       user,
//     });

//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// });
// router.patch("/update", protect, async (req, res) => {
//   try {
//     const data = req.body;

//     const user = await User.findById(req.user.id);

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     // =========================
//     // UPDATE ONLY PROVIDED FIELDS
//     // =========================

//     if (data?.name) {
//       user.name = data.name;
//     }

//     if (data?.avatar) {
//       user.avatar = data.avatar;
//     }

//     // only students should update these
//     if (data?.course) {
//       user.course = data.course;
//     }

//     if (data?.semester) {
//       user.semester = data.semester;
//     }

//     await user.save();

//     res.json({
//       success: true,
//       message: "Profile updated successfully",
//       user,
//     });

//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       message: err.message,
//     });
//   }
// });
// ==========================================
// BACKEND ROUTE
// routes/user.js
// ==========================================

router.patch("/update", protect, async (req, res) => {
  try {

    const {avatar} = req.body;

    const user = await User.findById(req.user.id);

    if(!user){
      throw new Error("User not found");
      
    }
    user.avatar = avatar;
    await user.save();

    res.json({
      success: true,
      message: "Profile updated successfully",
      user: user,
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});
// ==========================
// GET ALL USERS (PUBLIC SAFE LIST)
// ==========================
router.get("/", protect, async (req, res) => {
  try {

    const users = await User.find()
      .select("name avatar role course semester verified");

    res.json({
      success: true,
      users,
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});


// ==========================
// GET SINGLE USER BY ID
// ==========================
router.get("/:id", protect, async (req, res) => {
  try {

    const user = await User.findById(req.params.id)
      .select("-password -selfie");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      user,
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});


// ==========================
// DELETE MY ACCOUNT
// ==========================
router.delete("/delete", protect, async (req, res) => {
  try {

    await User.findByIdAndDelete(req.user.id);

    res.json({
      success: true,
      message: "Account deleted successfully",
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});


// ==========================
// (OPTIONAL) ADMIN ONLY - DELETE ANY USER
// ==========================
router.delete(
  "/admin/:id",
  protect,
  authorizeRoles("admin"),
  async (req, res) => {
    try {

      await User.findByIdAndDelete(req.params.id);

      res.json({
        success: true,
        message: "User deleted by admin",
      });

    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }
);

module.exports = router;