const { getRevenue, getItemData } = require("../models/revenue");

const revenueRoute = require("express").Router();

revenueRoute.get("/admin/get-revenue/:date", async (req, res) => {
  const { date } = req.params;
  var result = await getRevenue(date);
  if (result[0].success === true) {
    result = result.slice(1);
    var total = 0;
    result.forEach((val) => {
      total += val.total;
    });

    return res.json({ success: true, data: { total: total, data: result } });
  }
  return res.json({ success: false });
});

revenueRoute.get("/admin/item-data", async (req, res) => {
  const result = await getItemData();
  if (result[0].success === true) {
    return res.json({
      success: true,
      data: { total: total, data: result.slice(1) },
    });
  }
  return res.json({ success: false });
});
module.exports = { revenueRoute };
