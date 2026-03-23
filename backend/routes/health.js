const express = require("express");
const router = express.Router();

// GET /health
router.get("/", (req, res) => {
  res.status(200).send("OK");
});

module.exports = router;
