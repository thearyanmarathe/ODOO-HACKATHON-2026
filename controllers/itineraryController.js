const Itinerary = require("../models/Itinerary");

// Add Stop
exports.addStop = async (req, res) => {
  try {
    const { tripId, city, date } = req.body;

    let itinerary = await Itinerary.findOne({ trip: tripId });

    // If no itinerary exists, create one
    if (!itinerary) {
      itinerary = await Itinerary.create({
        trip: tripId,
        stops: []
      });
    }

    // Add new stop
    itinerary.stops.push({ city, date });

    await itinerary.save();

    res.json(itinerary);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Add Activity to a Stop
exports.addActivity = async (req, res) => {
  try {
    const { itineraryId, stopId, name, time } = req.body;

    const itinerary = await Itinerary.findById(itineraryId);

    const stop = itinerary.stops.id(stopId);

    stop.activities.push({ name, time });

    await itinerary.save();

    res.json(itinerary);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Reorder Stops
exports.reorderStops = async (req, res) => {
  try {
    const { itineraryId, newOrder } = req.body;

    const itinerary = await Itinerary.findById(itineraryId);

    if (!itinerary) {
      return res.status(404).json({ message: "Itinerary not found" });
    }

    if (newOrder.length !== itinerary.stops.length) {
      return res.status(400).json({ message: "Invalid order array" });
    }

    const reorderedStops = [];

    newOrder.forEach(index => {
      reorderedStops.push(itinerary.stops[index]);
    });

    itinerary.stops = reorderedStops;

    await itinerary.save();

    res.json(itinerary);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};