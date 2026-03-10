const { spawn } = require("child_process");
const path = require("path");

function generateEmail(lead, campaign) {

  return new Promise((resolve, reject) => {

    const scriptPath = path.join(
      __dirname,
      "./email_generation/main.py"
    );

    const python = spawn("python3", [

      scriptPath,

      "--first_name", lead.first_name,
      "--job_title", lead.job_title || "Marketing Lead",
      "--company_name", lead.company,

      "--seller_company_description",
      campaign.seller_company_description,

      "--product_description",
      campaign.product_description,

      "--seller_website",
      campaign.seller_website

    ]);

    let data = "";
    let error = "";

    python.stdout.on("data", chunk => {
      data += chunk.toString();
    });

    python.stderr.on("data", chunk => {
      error += chunk.toString();
    });

    python.on("close", () => {

      if (error) {
        return reject(error);
      }

      try {

        const parsed = JSON.parse(data);

        resolve(parsed);

      } catch {

        reject("Failed to parse python output");

      }

    });

  });

}

module.exports = { generateEmail };