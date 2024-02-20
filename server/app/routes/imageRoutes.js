const User = require("../models/User");
const express = require("express");
const router = express.Router();
const { PutObjectCommand } = require("@aws-sdk/client-s3");
const multer = require("multer");
const fs = require("fs");
const s3Client = require("../../config/aws");
const { nextTick } = require("process");

require("dotenv").config();

const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;
    const fileStream = fs.createReadStream(file.path);

    const uploadParams = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: file.originalname,
      Body: fileStream,
    };

    const data = await s3Client.send(new PutObjectCommand(uploadParams));
    res.status(200).send("File uploaded successfully.");
  } catch (err) {
    err.status = 500;
    next(err);
  }
});

module.exports = router;
