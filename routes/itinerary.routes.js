const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

const { addStop, addActivity, reorderStops } = require("../controllers/itineraryController");

router.get("/test", (req, res) => {
  res.send("Itinerary working");
});

router.post("/add-stop", auth, addStop);
router.post("/add-activity", auth, addActivity);
router.post("/reorder-stops", auth, reorderStops);

module.exports = router;