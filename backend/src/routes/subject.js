const express = require("express");
const Subject = require("../database/models/Subject");
const protect = require("../middleware/auth");
const router = express.Router();
router.use(express.json());

router.get("/all/:id", async(req,res) => {
    try {
        const {id} = req.params;
        const subjects = await Subject.find({course:id});
        if(subjects.length === 0) res.status(200).json({success:true, message:"Not enough subjects to display"});
        res.status(200).json({success:true, subjects});
    } catch (err) {
         res.status(500).json({
        success: false,
        message: err.message,
      });
    }
});

router.get("/all/:id/:sem", async(req,res) => {
    try {
        const {id,sem} = req.params;
        const subjects = await Subject.find({
            course:id,
            semester:sem
        });
        if(subjects.length === 0) res.status(200).json({success:true, message:"Not enough subjects to display for this semester."});
        res.status(200).json({success:true, subjects})
    } catch (err) {
        res.status(500).json({
        success: false,
        message: err.message,
      });
    }
})

router.post("/add",protect, async(req,res) => {
    const {name,code,semester,course} = req.body;
    try {
        const subject = await Subject.findOne({
      code,
      semester,
      course,
    });
        if(subject){
            throw new Error("Subject already exists");
        }
        const newSubject = new Subject({
            name:name,
            code:code,
            semester:semester,
            course:course
        });
        await newSubject.save();
        res.status(200).json({success:true, newSubject});
    } catch (err) {
         res.status(500).json({
        success: false,
        message: err.message,
      });
    }
});




module.exports = router;