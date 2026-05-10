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