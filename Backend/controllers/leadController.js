const { parseCSV } = require("../utils/csvParser");

exports.uploadLeads = async (req, res) => {

  try {

    const leads = await parseCSV(req.file.path);

    res.json({
      message: "Leads uploaded successfully",
      leads
    });

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

};