// ==========================================
// routes/resources.js
// ==========================================

const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
const axios = require("axios");

const Resource = require("../database/models/Resources");

const protect = require("../middleware/auth");

const router = express.Router();

// ==========================================
// CLOUDINARY
// ==========================================

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ==========================================
// MULTER
// ==========================================

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 20 * 1024 * 1024,
  },
});

// ==========================================
// GET RESOURCES
// ==========================================

router.get("/all/:id/:sem/:sub", async (req, res) => {
  try {
    const { id, sem, sub } = req.params;

    const resources = await Resource.find({
      course: id,
      semester: sem,
      subject: sub,
    })
      .populate("uploadedBy", "name avatar")
      .populate("subject", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      resources,
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// ==========================================
// UPLOAD RESOURCE
// ==========================================

// router.post(
//   "/upload",
//   protect,
//   upload.single("file"),
//   async (req, res) => {

//     try {

//       const {
//         title,
//         type,
//         course,
//         subject,
//         semester,
//       } = req.body;

//       if (!req.file) {
//         return res.status(400).json({
//           success: false,
//           message: "No file uploaded",
//         });
//       }

//       const uploadStream = cloudinary.uploader.upload_stream(
//         {
//           folder: "stackx/resources",

//           resource_type: "auto",
//           public_id: `${Date.now()}-${title}`,

//           overwrite: false,
//         },

//         async (error, result) => {

//           if (error) {
//             console.log(error);

//             return res.status(500).json({
//               success: false,
//               message: error.message,
//             });
//           }

//           const resource = await Resource.create({
//             title,
//             type,
//             course,
//             subject,
//             semester,
//             pdfUrl: result.secure_url,
//             public_id: result.public_id,
//             uploadedBy: req.user.id,
//           });
          

//           return res.status(201).json({
//             success: true,
//             resource,
//           });
//         }
//       );

//       streamifier
//         .createReadStream(req.file.buffer)
//         .pipe(uploadStream);

//     } catch (err) {

//       console.log(err);

//       res.status(500).json({
//         success: false,
//         message: err.message,
//       });
//     }
//   }
// );
// ==========================================
// UPLOAD RESOURCE
// ==========================================

// router.post(
//   "/upload",
//   protect,
//   upload.single("file"),
//   async (req, res) => {

//     try {

//       const {
//         title,
//         type,
//         course,
//         subject,
//         semester,
//       } = req.body;

//       if (!req.file) {

//         return res.status(400).json({
//           success: false,
//           message: "No file uploaded",
//         });
//       }

//       // PDF VALIDATION

//       if (
//         req.file.mimetype !==
//         "application/pdf"
//       ) {

//         return res.status(400).json({
//           success: false,
//           message: "Only PDF files are allowed",
//         });
//       }

//       const uploadStream =
//         cloudinary.uploader.upload_stream(

//           {
//             folder: "stackx/resources",

//             resource_type: "raw",

//             public_id: `${Date.now()}-${title.replace(/\s+/g, "-")}`,

//             format: "pdf",
//           },

//           async (error, result) => {

//             if (error) {

//               console.log(error);

//               return res.status(500).json({
//                 success: false,
//                 message: error.message,
//               });
//             }

//             // IMPORTANT

//             // RAW FILE URL
//             // THIS IS THE REAL PDF URL

//             const pdfUrl =
//               result.secure_url;

//             const resource =
//               await Resource.create({

//                 title,
//                 type,
//                 course,
//                 subject,
//                 semester,

//                 pdfUrl,

//                 public_id:
//                   result.public_id,

//                 uploadedBy:
//                   req.user.id,
//               });

//             return res.status(201).json({
//               success: true,
//               resource,
//             });
//           }
//         );

//       streamifier
//         .createReadStream(req.file.buffer)
//         .pipe(uploadStream);

//     } catch (err) {

//       console.log(err);

//       return res.status(500).json({
//         success: false,
//         message: err.message,
//       });
//     }
//   }
// );

// ==========================================
// UPLOAD RESOURCE
// ==========================================

router.post(
  "/upload",
  protect,
  upload.single("file"),
  async (req, res) => {

    try {

      const {
        title,
        type,
        course,
        subject,
        semester,
      } = req.body;

      if (!req.file) {

        return res.status(400).json({
          success: false,
          message: "No file uploaded",
        });
      }

      // VALIDATE PDF

      if (
        req.file.mimetype !==
        "application/pdf"
      ) {

        return res.status(400).json({
          success: false,
          message: "Only PDF files allowed",
        });
      }

      const uploadStream =
        cloudinary.uploader.upload_stream(

          {
            folder: "stackx/resources",

            resource_type: "raw",

            use_filename: true,

            unique_filename: true,

            overwrite: false,
          },

          async (error, result) => {

            if (error) {

              console.log(error);

              return res.status(500).json({
                success: false,
                message: error.message,
              });
            }

            console.log(result);

            const resource =
              await Resource.create({

                title,
                type,
                course,
                subject,
                semester,

                pdfUrl:
                  result.secure_url,

                public_id:
                  result.public_id,

                uploadedBy:
                  req.user.id,
              });

            return res.status(201).json({
              success: true,
              resource,
            });
          }
        );

      streamifier
        .createReadStream(req.file.buffer)
        .pipe(uploadStream);

    } catch (err) {

      console.log(err);

      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }
);
// ==========================================
// VIEW PDF
// ==========================================

// router.get("/view/:id", async (req, res) => {

//   try {

//     const resource = await Resource.findById(req.params.id);

//     if (!resource) {
//       return res.status(404).json({
//         success: false,
//         message: "Resource not found",
//       });
//     }

//     return res.redirect(resource.pdfUrl);

//   } catch (err) {

//     console.log(err);

//     res.status(500).json({
//       success: false,
//       message: err.message,
//     });
//   }
// });
// ==========================================
// VIEW PDF
// ==========================================

router.get("/view/:id", async (req, res) => {

  try {

    const resource =
      await Resource.findById(
        req.params.id
      );

    if (!resource) {

      return res.status(404).json({
        success: false,
        message: "Resource not found",
      });
    }

    return res.redirect(
      resource.pdfUrl
    );

  } catch (err) {

    console.log(err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// ==========================================
// DOWNLOAD PDF
// ==========================================

// router.get("/download/:id", async (req, res) => {

//   try {

//     const resource = await Resource.findById(req.params.id);

//     if (!resource) {
//       return res.status(404).json({
//         success: false,
//         message: "Resource not found",
//       });
//     }

//     const response = await axios.get(resource.pdfUrl, {
//       responseType: "stream",
//     });

//     res.setHeader(
//       "Content-Disposition",
//       `attachment; filename="${resource.title}.pdf"`
//     );

//     res.setHeader(
//       "Content-Type",
//       "application/pdf"
//     );

//     response.data.pipe(res);

//   } catch (err) {

//     console.log(err);

//     res.status(500).json({
//       success: false,
//       message: "Download failed",
//     });
//   }
// });
// ==========================================
// DOWNLOAD PDF
// ==========================================

router.get(
  "/download/:id",
  async (req, res) => {

    try {

      const resource =
        await Resource.findById(
          req.params.id
        );

      if (!resource) {

        return res.status(404).json({
          success: false,
          message:
            "Resource not found",
        });
      }
      await Resource.findByIdAndUpdate(
        req.params.id,
        {
          $inc: { downloads: 1 },
        }
      );
      const response =
        await axios({
          url: resource.pdfUrl,
          method: "GET",
          responseType: "stream",
        });

      res.setHeader(
        "Content-Type",
        "application/pdf"
      );

      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${resource.title}.pdf"`
      );

      

      response.data.pipe(res);


    } catch (err) {

      console.log(err);

      return res.status(500).json({
        success: false,
        message:
          "Download failed",
      });
    }
  }
);

module.exports = router;