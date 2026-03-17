const { spawn } = require("child_process");
const path = require("path");

function generateEmail(lead, campaign) {

  return new Promise((resolve, reject) => {

    const scriptPath = path.join(
      __dirname,
      "../../email_generation/main.py"
    );

    console.log("Python script path:", scriptPath);

    const python = spawn("python", [
      scriptPath,

      "--first_name",
      (lead.Name || lead.first_name || "").split(" ")[0],

      "--job_title",
      lead.job_title || "Marketing Lead",

      "--company_name",
      lead.company || "",

      "--seller_company_description",
      campaign.seller_company_description || "",

      "--product_description",
      campaign.product_description || "",

      "--seller_website",
      campaign.seller_website || ""
    ]);

    let data = "";
    let error = "";

    python.stdout.on("data", (chunk) => {
      data += chunk.toString();
    });

    python.stderr.on("data", (chunk) => {
      error += chunk.toString();
    });

    python.on("error", (err) => {
      reject("Failed to start python process: " + err.message);
    });

    python.on("close", (code) => {

      if (code !== 0) {
        return reject("Python exited with code " + code + " : " + error);
      }

      try {

        const jsonStart = data.lastIndexOf("{");

        if (jsonStart === -1) {
          return reject("No JSON found in python output:\n" + data);
        }

        const jsonString = data.slice(jsonStart);

        const parsed = JSON.parse(jsonString);

        resolve(parsed);

      } catch (err) {

        reject("Failed to parse python output:\n" + data);

      }

    });

  });

}

module.exports = { generateEmail };