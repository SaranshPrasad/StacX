// ==========================================
// routes/message.js
// ==========================================

const express = require("express");

const router = express.Router();

const protect = require("../middleware/auth");
const axios = require("axios");
const Message = require(
  "../database/models/Message"
);

// ==========================================
// GET ALL MESSAGES
// ==========================================
router.get(
  "/download/:id",
  
  async (req, res) => {

    try {

      const message =
        await Message.findById(
          req.params.id
        );

      if (!message) {

        return res.status(404).json({
          success: false,
          message:
            "Message not found",
        });
      }

      if (!message.fileUrl) {

        return res.status(400).json({
          success: false,
          message:
            "No file found",
        });
      }

      const response =
        await axios({
          url: message.fileUrl,
          method: "GET",
          responseType: "stream",
        });

      // ==========================================
      // CONTENT TYPE
      // ==========================================

      const contentType =
        message.type === "pdf"
          ? "application/pdf"
          : response.headers[
              "content-type"
            ];

      res.setHeader(
        "Content-Type",
        contentType
      );

      // ==========================================
      // FILE NAME
      // ==========================================

      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${
          message.fileName ||
          "download"
        }"`
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
router.get(
  "/",
  protect,
  async (req, res) => {

    try {

      const messages =
        await Message.find()
          .sort({ createdAt: 1 });

      res.json({
        success: true,
        messages,
      });

    } catch (err) {

      console.log(err);

      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }
);

// ==========================================
// CREATE MESSAGE
// ==========================================

router.post(
  "/",
  protect,
  async (req, res) => {

    try {

      const {
        text,
        type,
        fileUrl,
        fileName,
        senderName,
        senderAvatar,
      } = req.body;

      // ==========================================
      // VALIDATION
      // ==========================================

      if (
        !text &&
        !fileUrl
      ) {

        return res.status(400).json({
          success: false,
          message:
            "Message or file is required",
        });
      }

      // ==========================================
      // CREATE MESSAGE
      // ==========================================

      const message =
        await Message.create({

          sender: req.user.id,

          senderName:
            senderName || "Unknown User",

          senderAvatar:
            senderAvatar || "",

          text: text || "",

          type: type || "text",

          fileUrl: fileUrl || "",

          fileName: fileName || "",
        });

      res.json({
        success: true,
        message,
      });

    } catch (err) {

      console.log(err);

      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }
);

// ==========================================
// DELETE MESSAGE
// ==========================================

router.delete(
  "/:id",
  protect,
  async (req, res) => {

    try {

      const message =
        await Message.findById(
          req.params.id
        );

      if (!message) {

        return res.status(404).json({
          success: false,
          message:
            "Message not found",
        });
      }

      // only sender can delete

      if (
        message.sender.toString() !==
        req.user.id
      ) {

        return res.status(403).json({
          success: false,
          message:
            "Unauthorized",
        });
      }

      await message.deleteOne();

      res.json({
        success: true,
        message:
          "Message deleted",
      });

    } catch (err) {

      console.log(err);

      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }
);

module.exports = router;