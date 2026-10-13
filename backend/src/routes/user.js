const express = require("express");
const protect = require("../middleware/auth");
const authorizeRoles = require("../middleware/roleMiddleware");
const User = require("../database/models/User");
const Request = require("../database/models/Request");
const Resources = require("../database/models/Resources");


const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

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



router.patch("/update", protect, async (req, res) => {
  try {

    const {avatar, semester} = req.body;
    

    const user = await User.findById(req.user.id);

    if(!user){
      throw new Error("User not found");
      
    }
    user.avatar = avatar;
    if(semester) {
      user.semester = semester;
    }
    await user.save();
    const uploaded = await Resources.find({uploadedBy: user._id}).countDocuments();
    const requested = await Request.find({requestedBy: user._id}).countDocuments();

    res.json({
      success: true,
      message: "Profile updated successfully",
       user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        course: user.course,
        semester: user.semester,
        avatar: user.avatar,
        verified: user.verified,
        uploaded: uploaded,
        requested
      },
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