const express = require("express");

const { sendCampaignEmails } = require("../controllers/emailController");

const router = express.Router();

router.post("/send", sendCampaignEmails);

module.exports = router;