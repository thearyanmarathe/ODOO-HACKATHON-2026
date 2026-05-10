const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  name: String,
  time: String,
});

const stopSchema = new mongoose.Schema({
  city: String,
  date: Date,
  activities: [activitySchema],
});

const itinerarySchema = new mongoose.Schema({
  trip: { type: mongoose.Schema.Types.ObjectId, ref: "Trip" },
  stops: [stopSchema],
}, { timestamps: true });

module.exports = mongoose.model("Itinerary", itinerarySchema);