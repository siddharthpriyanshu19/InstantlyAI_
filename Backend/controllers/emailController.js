const fs = require("fs");
const emailQueue = require("../queue/emailQueue");

exports.sendCampaignEmails = async (req, res) => {

  const { campaign } = req.body;

  if (!fs.existsSync("leads.json")) {
    return res.status(400).json({
      error: "No leads uploaded"
    });
  }

  const leads = JSON.parse(fs.readFileSync("leads.json"));

  console.log("Leads loaded:", leads.length);

  for (const lead of leads) {

    console.log("Adding job for:", lead);

    await emailQueue.add("sendEmail", {
      lead,
      campaign
    });

  }

  res.json({
    message: "Campaign queued",
    total: leads.length
  });

};