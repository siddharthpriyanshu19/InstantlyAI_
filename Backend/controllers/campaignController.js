exports.createCampaign = async (req, res) => {

  const {
    name,
    seller_company_description,
    product_description,
    seller_website
  } = req.body;

  const campaign = {
    name,
    seller_company_description,
    product_description,
    seller_website
  };

  res.json({
    message: "Campaign created",
    campaign
  });

};