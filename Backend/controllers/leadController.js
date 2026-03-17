const fs = require("fs");
const { parseCSV } = require("../utils/csvParser");

exports.uploadLeads = async (req, res) => {

  try {

    if (!req.file) {
      return res.status(400).json({
        error: "CSV file is required"
      });
    }

    const leads = await parseCSV(req.file.path);

    // save leads to file
    fs.writeFileSync("leads.json", JSON.stringify(leads, null, 2));
    console.log(leads);
    console.log("Leads saved:", leads.data);

    res.json({
      message: "Leads uploaded successfully",
      count: leads.length
    });

  } catch (err) {

    console.error("Upload error:", err);

    res.status(500).json({
      error: err.message
    });

  }

};