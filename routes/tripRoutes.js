const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  createTrip,
  getTrips,
  updateTrip,
  deleteTrip,
  getTripSummary,
} = require("../controllers/tripController");

router.post("/", auth, createTrip);
router.get("/", auth, getTrips);
router.put("/:id", auth, updateTrip);
router.delete("/:id", auth, deleteTrip);
router.get("/:id/summary", auth, getTripSummary);

module.exports = router;