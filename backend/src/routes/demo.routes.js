const express = require("express");
const router = express.Router();
console.log("✅ demo.controller loaded");

const {
  scheduleDemo,
  updateDemoOutcome,
  getDemos,
} = require("../controllers/demo.controller");

router.post("/", scheduleDemo);
router.post("/outcome", updateDemoOutcome);
router.get("/", getDemos)



module.exports = router;

