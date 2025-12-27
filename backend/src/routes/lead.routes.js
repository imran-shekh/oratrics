
const express = require("express");
const router = express.Router();
const {
  createLead,
  getLeads
} = require("../controllers/lead.controller");

router.post("/", createLead);
router.get("/", getLeads);

module.exports = router;
