const { generateEmail } = require("../services/aiService");
const emailQueue = require("../queue/emailQueue");

exports.sendCampaignEmails = async (req, res) => {

  const { leads, campaign } = req.body;

  for (const lead of leads) {

    await emailQueue.add("send-email", {
      lead,
      campaign
    });

  }

  res.json({
    message: "Emails added to queue"
  });

};