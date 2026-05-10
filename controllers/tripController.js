const Trip = require("../models/Trip");

// Create Trip
exports.createTrip = async (req, res) => {
  const trip = await Trip.create({
    ...req.body,
    user: req.user,
  });
  res.json(trip);
};

// Get All Trips
exports.getTrips = async (req, res) => {
  const trips = await Trip.find({ user: req.user });
  res.json(trips);
};

// Update Trip
exports.updateTrip = async (req, res) => {
  const trip = await Trip.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(trip);
};

// Delete Trip
exports.deleteTrip = async (req, res) => {
  await Trip.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};
const Itinerary = require("../models/Itinerary");
const Budget = require("../models/Budget");

// Get Full Trip Summary
exports.getTripSummary = async (req, res) => {
  try {
    const tripId = req.params.id;

    const trip = await Trip.findById(tripId);
    const itinerary = await Itinerary.findOne({ trip: tripId });
    const budget = await Budget.findOne({ trip: tripId });

    res.json({
      trip,
      itinerary,
      budget
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};