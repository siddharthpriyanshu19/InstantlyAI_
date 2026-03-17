const { Worker } = require("bullmq");

const { generateEmail } = require("../services/aiService");
const { sendEmail } = require("../services/gmailService");

const worker = new Worker(
  "emailQueue",
  async job => {

    try {

      const { lead, campaign } = job.data;

      console.log("JOB RECEIVED:", job.data);

      console.log("STEP 1: Generating email...");

      const result = await generateEmail(lead, campaign);

      console.log("STEP 2: AI email generated:", result);

      console.log("STEP 3: Sending email...");

      await sendEmail(lead.email, result.subject, result.body);

      console.log("STEP 4: Email sent to:", lead.email);

    } catch (err) {
      console.error("WORKER ERROR:", err);
    }

  },
  {
    connection: {
      host: "127.0.0.1",
      port: 6379
    }
  }
);