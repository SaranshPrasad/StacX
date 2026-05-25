const express = require("express");

const protect = require("../middleware/auth");

const Resources = require(
  "../database/models/Resources"
);

const Request = require(
  "../database/models/Request"
);

const router = express.Router();

// ==========================
// CREATE REQUEST
// ==========================

router.post(
  "/add",
  protect,
  async (req, res) => {
    try {

      const {
        message,
        type,
        course,
        subject,
        semester,
      } = req.body;

      const existing =
        await Resources.findOne({
          course,
          subject,
          semester,
          type,
        });

      if (existing) {

        return res.status(200).json({
          success: true,
          alreadyExists: true,
          message:
            "Resource already available",
          resource: existing,
        });
      }

      const request =
        await Request.create({
          message,
          type,
          course,
          subject,
          semester,
          requestedBy:
            req.user.id,
        });

      const populatedRequest =
        await Request.findById(
          request._id
        )
          .populate(
            "requestedBy",
            "name avatar role"
          )
          .populate(
            "course",
            "name"
          )
          .populate(
            "subject",
            "name code"
          );

      // SOCKET EVENT
      const io =
        req.app.get("io");

      io.emit(
        "new_request",
        populatedRequest
      );

      res.status(201).json({
        success: true,
        message:
          "Request created successfully",
        request:
          populatedRequest,
      });

    } catch (err) {

      res.status(500).json({
        success: false,
        message:
          err.message,
      });
    }
  }
);

// ==========================
// GET MY REQUESTS
// ==========================

router.get(
  "/my",
  protect,
  async (req, res) => {
    try {

      const requests =
        await Request.find({
          requestedBy:
            req.user.id,
        })
          .populate(
            "course",
            "name"
          )
          .populate(
            "subject",
            "name code"
          )
          .populate(
            "resolvedBy",
            "name"
          )
          .populate({
            path:
              "resolvedResource",
            populate: {
              path:
                "uploadedBy",
              select:
                "name",
            },
          })
          .sort({
            createdAt: -1,
          });

      res.json({
        success: true,
        requests,
      });

    } catch (err) {

      res.status(500).json({
        success: false,
        message:
          err.message,
      });
    }
  }
);

// ==========================
// GET ALL REQUESTS
// ==========================

router.get(
  "/",
  protect,
  async (req, res) => {
    try {
     
      const requests =
        await Request.find()
          .populate(
            "requestedBy",
            "name avatar role"
          )
          .populate(
            "course",
            "name"
          )
          .populate(
            "subject",
            "name code"
          )
          .populate(
            "resolvedBy",
            "name"
          )
          .populate(
            "resolvedResource"
          )
          .sort({
            createdAt: -1,
          });

      res.json({
        success: true,
        requests,
      });

    } catch (err) {

      res.status(500).json({
        success: false,
        message:
          err.message,
      });
    }
  }
);

// ==========================
// RESOLVE REQUEST
// ==========================

router.post(
  "/:id/resolve",
  protect,
  async (req, res) => {
    try {

      const {
        resourceId,
      } = req.body;

      const request =
        await Request.findById(
          req.params.id
        );

      if (!request) {

        return res.status(404).json({
          success: false,
          message:
            "Request not found",
        });
      }

      request.status =
        "resolved";

      request.resolvedBy =
        req.user.id;

      request.resolvedResource =
        resourceId;

      await request.save();

      const populatedRequest =
        await Request.findById(
          request._id
        )
          .populate(
            "requestedBy",
            "name avatar"
          )
          .populate(
            "resolvedBy",
            "name"
          )
          .populate(
            "resolvedResource"
          );

      const io =
        req.app.get("io");

      io.emit(
        "request_resolved",
        populatedRequest
      );

      res.json({
        success: true,
        message:
          "Request resolved successfully",
        request:
          populatedRequest,
      });

    } catch (err) {

      res.status(500).json({
        success: false,
        message:
          err.message,
      });
    }
  }
);

// ==========================
// DELETE REQUEST
// ==========================

router.delete(
  "/:id",
  protect,
  async (req, res) => {
    try {

      const request =
        await Request.findById(
          req.params.id
        );

      if (!request) {

        return res.status(404).json({
          success: false,
          message:
            "Request not found",
        });
      }

      if (
        request.requestedBy.toString() !==
          req.user.id &&
        req.user.role !==
          "admin"
      ) {

        return res.status(403).json({
          success: false,
          message:
            "Not authorized",
        });
      }

      await request.deleteOne();

      res.json({
        success: true,
        message:
          "Request deleted",
      });

    } catch (err) {

      res.status(500).json({
        success: false,
        message:
          err.message,
      });
    }
  }
);

module.exports = router;