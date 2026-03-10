const express = require("express");
const multer = require("multer");

const { uploadLeads } = require("../controllers/leadController");

const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("file"), uploadLeads);

module.exports = router;