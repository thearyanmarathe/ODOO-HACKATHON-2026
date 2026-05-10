const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

const {
  addStop,
  addActivity
} = require("../controllers/itineraryController");

router.post("/add-stop", auth, addStop);
router.post("/add-activity", auth, addActivity);

module.exports = router;