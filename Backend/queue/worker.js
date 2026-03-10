const { Worker } = require("bullmq");

const { generateEmail } = require("../services/aiService");
const { sendEmail } = require("../services/gmailService");

const worker = new Worker(

  "emailQueue",

  async job => {

    const { lead, campaign } = job.data;

    const result = await generateEmail(lead, campaign);

    await sendEmail(
      lead.email,
      "Quick question",
      result.email
    );

  },

  {
    connection: {
      host: "127.0.0.1",
      port: 6379
    }
  }

);

worker.on("completed", job => {
  console.log(`Email sent for ${job.data.lead.email}`);
});