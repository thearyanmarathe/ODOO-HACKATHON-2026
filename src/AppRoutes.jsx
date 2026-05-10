import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Existing screens
import Login from "./Login";
import Dashboard from "./Dashboard";
import Trips from "./Trips";
import CreateTrip from "./CreateTrip";
import ItineraryBuilder from "./ItineraryBuilder";
import Budget from "./Budget";
import Community from "./Community";
import Profile from "./Profile";
import ActivitySearch from "./ActivitySearch";

// New screens
import ItineraryView from "./ItineraryView";
import CitySearch from "./CitySearch";
import PackingChecklist from "./PackingChecklist";
import SharedItinerary from "./SharedItinerary";
import TripNotes from "./TripNotes";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Login */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Login />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Trips */}
        <Route path="/trips" element={<Trips />} />

        {/* Create Trip */}
        <Route path="/create-trip" element={<CreateTrip />} />

        {/* Itinerary Builder */}
        <Route
          path="/itinerary/:id"
          element={<ItineraryBuilder />}
        />

        {/* Itinerary View */}
        <Route
          path="/itinerary/:id/view"
          element={<ItineraryView />}
        />

        {/* City Search */}
        <Route path="/cities" element={<CitySearch />} />

        {/* Activity Search */}
        <Route path="/activities" element={<ActivitySearch />} />

        {/* Budget */}
        <Route path="/budget" element={<Budget />} />

        {/* Packing Checklist */}
        <Route
          path="/packing"
          element={<PackingChecklist />}
        />

        <Route
          path="/trips/:id/packing"
          element={<PackingChecklist />}
        />

        {/* Shared Itinerary */}
        <Route
          path="/trip/:slug"
          element={<SharedItinerary />}
        />

        {/* Profile */}
        <Route path="/profile" element={<Profile />} />

        {/* Trip Notes */}
        <Route path="/notes" element={<TripNotes />} />

        <Route
          path="/trips/:id/notes"
          element={<TripNotes />}
        />

        {/* Community */}
        <Route path="/community" element={<Community />} />

        {/* Fallback */}
        <Route
          path="*"
          element={<Navigate to="/dashboard" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
}