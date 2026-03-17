const fs = require("fs");
const csv = require("csv-parser");

exports.parseCSV = (filePath) => {

  return new Promise((resolve, reject) => {

    // ensure file is CSV
    if (!filePath.endsWith(".csv")) {
      return reject(new Error("Only CSV files are allowed"));
    }

    const results = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => {

        // skip rows without email
        if (!data.email) return;

        results.push({
          company: data.company || data.company_name || "",
          website: data.website || "",
          email: data.email.trim()
        });

      })
      .on("end", () => {

        console.log("CSV parsed successfully:", results.length);

        resolve(results);

      })
      .on("error", (err) => {
        reject(err);
      });

  });

};