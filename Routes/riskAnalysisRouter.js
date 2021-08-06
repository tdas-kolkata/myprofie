const express = require("express");

const riskAnalysisRouter = express.Router();
const { getPool } = require("../Database/dataSource");

riskAnalysisRouter.get("/api/all", async (req, res) => {
  try {
    const pool = await getPool();
    const { rowCount, rows } = await pool.query(
      "select * from volatility_aggr;"
    );
    res.json({ rowCount, rows });
  } catch (err) {
    console.log(err);
    res.status(404).send("Something went wrong");
  }
});

module.exports = riskAnalysisRouter;
