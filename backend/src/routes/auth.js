const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../database/models/User");
const protect = require("../middleware/auth");
const cookieParser = require("cookie-parser")
const router = express.Router();
router.use(express.json());
router.use(cookieParser());

// router.post("/signup", async (req, res) => {

//   try {

//     const {
//       name,
//       email,
//       password,
//       role,
//       course,
//       semester,
//       selfie,
//     } = req.body;

//     const existingUser = await User.findOne({ email });

//     if (existingUser) {
//       return res.status(400).json({
//         success: false,
//         message: "User already exists",
//       });
//     }

    
//     const hashedPassword = await bcrypt.hash(password, 10);
//     if(role === "admin"){
//       const user = await User.create({
//       name,
//       email,
//       password: hashedPassword,
//       role,
//       avatar,
//       verified:true
//     });
//     }else if(role === "teacher"){
//       const user = await User.create({
//       name,
//       email,
//       password: hashedPassword,
//       role,
//     });
//     }else{
//       const user = await User.create({
//       name,
//       email,
//       password: hashedPassword,
//       role,
//       course,
//       semester,
//       selfie,
//     });
//     }
//     const token = jwt.sign(
//       {
//         id: user._id,
//         role: user.role,
//       },
//       process.env.JWT_SECRET,
//       {
//         expiresIn: "7d",
//       }
//     );

//     res.status(201).json({
//       success: true,
//       message: "Signup successful",

//       token,

//      user
//     });

//   } catch (error) {

//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });

//   }

// });

router.post("/signup", async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role,
      course,
      semester,
      selfie,
    } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // =========================
    // BASE USER OBJECT
    // =========================
    let userData = {
      name,
      email,
      password: hashedPassword,
      role,
      verified: false, // default
    };

    // =========================
    // ROLE BASED LOGIC
    // =========================

    if (role === "student") {
      userData.course = course;
      userData.semester = semester;
      userData.selfie = selfie;
      userData.verified = false; // needs admin approval
    }

    if (role === "teacher") {
      userData.selfie = selfie;
      userData.verified = false; // optional: admin approval required
    }

    if (role === "admin") {
      // ⚠️ admin should NOT be freely created in real apps
      userData.verified = true;
    }

    const user = await User.create(userData);

    // =========================
    // TOKEN
    // =========================
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(201).json({
      success: true,
      message: "Signup successful",
      token,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});



router.post("/login", async (req, res) => {

  try {

    const { email, password } = req.body;

    
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    if(!user.verified){
        return res.status(400).json({
        success: false,
        message: "User is not verified yet..",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Generate token
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",

      token,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        course: user.course,
        semester: user.semester,
        avatar: user.avatar,
        verified: user.verified,
      },
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

});



router.post("/logout", protect, async (req, res) => {

  try {

    res.status(200).json({
      success: true,
      message: "Logout successful",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

});



// ====================================
// GET CURRENT USER
// ====================================

router.get("/me", protect, async (req, res) => {

  try {

    const user = await User.findById(req.user.id)
      .select("-password");

    res.status(200).json({
      success: true,
      user,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

});



module.exports = router;