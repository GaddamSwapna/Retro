import React, { useState } from "react";

// Sample event data
const eventData = [
  {
    id: 1,
    title: "Retro Gaming Meetup",
    description: "A meetup for retro gaming enthusiasts to discuss and play old school games.",
    date: "2024-12-22",
    time: "5:00 PM",
    location: "Online",
    capacity: 50,
    booked: 20,
    type: "Meetup",
  },
  {
    id: 2,
    title: "Classic Console Convention",
    description: "A convention for classic console collectors and fans.",
    date: "2024-12-25",
    time: "10:00 AM",
    location: "Offline - New York City",
    capacity: 100,
    booked: 70,
    type: "Convention",
  },
  {
    id: 3,
    title: "Retro Game Tournament",
    description: "A tournament to compete in popular retro games.",
    date: "2025-01-05",
    time: "2:00 PM",
    location: "Online",
    capacity: 100,
    booked: 30,
    type: "Tournament",
  },
];

// Predefined light colors for each event card
const colors = [
  "bg-blue-100", // Light Blue
  "bg-green-100", // Light Green
  "bg-yellow-100", // Light Yellow
  "bg-purple-100", // Light Purple
  "bg-pink-100", // Light Pink
  "bg-teal-100", // Light Teal
];

function Booknow() {
  const [events, setEvents] = useState(eventData);
  const [searchTerm, setSearchTerm] = useState("");
  const [bookedEvents, setBookedEvents] = useState([]);
  const [eventTypeFilter, setEventTypeFilter] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");

  // Function to handle event booking
  const bookEvent = (eventId) => {
    const updatedEvents = events.map((event) => {
      if (event.id === eventId) {
        return { ...event, booked: event.booked + 1 };
      }
      return event;
    });
    setEvents(updatedEvents);
    setBookedEvents((prev) => [...prev, eventId]); // Keep track of booked events
  };

  // Function to handle search filtering
  const filteredEvents = events.filter((event) => {
    const isMatch =
      (event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (eventTypeFilter ? event.type.toLowerCase() === eventTypeFilter.toLowerCase() : true) &&
      (availabilityFilter === "all" ? true : availabilityFilter === "available" ? event.booked < event.capacity : event.booked === event.capacity) &&
      (dateFilter ? new Date(event.date) >= new Date(dateFilter) : true);

    return isMatch;
  });

  return (
    <div className="p-6 white-to-r from-blue-50 via-purple-50 to-pink-50 min-h-screen ">
      <h1 className="text-4xl font-bold text-center text-blue-800 mb-6  transition-colors duration-300 black:text-white">
        Retro Gaming Events
      </h1>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 hover:border-blue-400 hover:bg-blue-50 transition-all duration-300"
          placeholder="Search events..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Filters */}
      <div className="mb-6 space-x-4">
        <label className="font-semibold text-gray-900 dark:text-white">
          Event Type:
          <select
            value={eventTypeFilter}
            onChange={(e) => setEventTypeFilter(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 dark:text-black"
          >
            <option value="" >All</option>
            <option  value="Meetup">Meetup</option>
            <option  value="Tournament">Tournament</option>
            <option  value="Convention">Convention</option>
          </select>
        </label>

        <label className="font-semibold text-gray-900 dark:text-white">
          Availability:
          <select
            value={availabilityFilter}
            onChange={(e) => setAvailabilityFilter(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 dark:text-black"
          >
            <option value="all">All</option>
            <option value="available">Available</option>
            <option value="full">Fully Booked</option>
          </select>
        </label>

        <label className="font-semibold text-gray-900 dark:text-white">
          Date From:
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 dark:text-black"
          />
        </label>
      </div>

      {/* Event Listings */}
      <div>
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event, index) => (
            <div
              key={event.id}
              className={`p-6 shadow-lg rounded-lg mb-4 border border-gray-300 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300  hover:shadow-xl ${colors[index % colors.length]}`}
            >
              <h2 className="text-2xl font-semibold text-gray-800">{event.title}</h2>
              <p className="text-gray-600">{event.description}</p>
              <p className="text-gray-700 mt-2">
                <strong>Date:</strong> {event.date}
              </p>
              <p className="text-gray-700">
                <strong>Time:</strong> {event.time}
              </p>
              <p className="text-gray-700">
                <strong>Location:</strong> {event.location}
              </p>
              <p className="text-gray-700">
                <strong>Capacity:</strong> {event.capacity} (Booked: {event.booked})
              </p>

              {/* Booking Button */}
              {event.booked < event.capacity && !bookedEvents.includes(event.id) ? (
                <button
                  onClick={() => bookEvent(event.id)}
                  className="bg-blue-500 text-white px-6 py-3 mt-4 rounded-lg hover:bg-blue-400 hover:scale-105 transition-all duration-300"
                >
                  Book Now
                </button>
              ) : (
                <button
                  className="bg-gray-500 text-white px-6 py-3 mt-4 rounded-lg cursor-not-allowed hover:bg-gray-400 transition-all duration-300"
                  disabled
                >
                  Fully Booked
                </button>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-700">No events found matching your search and filters.</p>
        )}
      </div>
    </div>
  );
}

export default Booknow;
