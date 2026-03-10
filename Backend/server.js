const express = require("express");
const cors = require("cors");

const leadRoutes = require("./routes/leadRoutes");
const campaignRoutes = require("./routes/campaignRoutes");
const emailRoutes = require("./routes/emailRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/leads", leadRoutes);
app.use("/campaigns", campaignRoutes);
app.use("/emails", emailRoutes);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`InstantlyAI backend running on port ${PORT}`);
});