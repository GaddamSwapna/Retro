import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import 'leaflet/dist/leaflet.css'; // Make sure to import Leaflet CSS

const Mapintegration = () => {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Retro Gaming Tournament: Classic Arcade Battle",
      date: "2024-12-20",
      time: "10:00 AM - 2:00 PM",
      location: "Offline - Retro Game Arcade, Downtown",
      description: "Compete in a tournament featuring classic arcade games from the '80s and '90s. Show off your skills!",
      capacity: 100,
      remaining: 50,
      type: "Tournament",
      lat: 37.7749,
      lng: -122.4194,
    },
    {
      id: 2,
      title: "Old-School Console Gaming Meetup",
      date: "2024-12-25",
      time: "3:00 PM - 6:00 PM",
      location: "Offline - Retro Gaming Lounge, City Mall",
      description: "Meet fellow retro gamers and relive the glory days of console gaming. Play vintage games like NES, Sega Genesis, and more.",
      capacity: 50,
      remaining: 50,
      type: "Meetup",
      lat: 37.7749,
      lng: -122.4194,
    },
    {
      id: 3,
      title: "Retro Gaming Social: Battle Royale Edition",
      date: "2025-01-10",
      time: "6:00 PM - 9:00 PM",
      location: "Offline - Retro Game Center, Main Street",
      description: "Join us for a social battle royale featuring retro games like Super Mario Bros, Pac-Man, and Space Invaders.",
      capacity: 50,
      remaining: 30,
      type: "Meetup",
      lat: 34.0522,
      lng: -118.2437,
    },
    {
      id: 4,
      title: "Workshop: Building Your Own Retro Game Console",
      date: "2025-02-15",
      time: "11:00 AM - 4:00 PM",
      location: "Offline - Retro Electronics Studio, Downtown",
      description: "Learn how to build your own retro gaming console from scratch, using Raspberry Pi and open-source software.",
      capacity: 40,
      remaining: 40,
      type: "Workshop",
      lat: 40.7128,
      lng: -74.0060,
    },
    {
      id: 5,
      title: "Retro VR Movie Night: Classic Arcade Flicks",
      date: "2025-03-05",
      time: "7:00 PM - 10:00 PM",
      location: "Offline - VR Theater, Uptown",
      description: "Experience classic arcade-themed VR movies in a fully immersive virtual cinema experience.",
      capacity: 30,
      remaining: 20,
      type: "Movie Night",
      lat: 41.8781,
      lng: -87.6298,
    },
    {
      id: 6,
      title: "VR Retro Fitness: Arcade Workout",
      date: "2025-04-01",
      time: "8:00 AM - 9:00 AM",
      location: "Offline - VR Gym, Sports Complex",
      description: "Get fit while playing your favorite retro games in VR! A unique workout experience combining fitness and nostalgia.",
      capacity: 25,
      remaining: 10,
      type: "Fitness",
      lat: 51.5074,
      lng: -0.1278,
    },
    {
      id: 7,
      title: "Retro Gaming Networking Event",
      date: "2025-05-20",
      time: "2:00 PM - 5:00 PM",
      location: "Offline - Retro Hub, Tech Park",
      description: "Network with other retro gaming enthusiasts and industry professionals. Share your love for the classics.",
      capacity: 50,
      remaining: 30,
      type: "Networking",
      lat: 48.8566,
      lng: 2.3522,
    },
    {
      id: 8,
      title: "Retro Gaming Concert: 8-Bit Music Live",
      date: "2025-06-10",
      time: "9:00 PM - 11:00 PM",
      location: "Offline - Retro Arena, Music Hall",
      description: "Experience a live concert featuring 8-bit music from your favorite retro games.",
      capacity: 100,
      remaining: 75,
      type: "Concert",
      lat: 52.3676,
      lng: 4.9041,
    },
    {
      id: 9,
      title: "VR Retro Escape Room Challenge",
      date: "2025-07-18",
      time: "10:00 AM - 1:00 PM",
      location: "Offline - VR Escape Center, Old Town",
      description: "Work with a team to solve retro-themed puzzles in a VR escape room.",
      capacity: 20,
      remaining: 15,
      type: "Escape Room",
      lat: 37.7749,
      lng: -122.4194,
    }
  ]);

  const [search, setSearch] = useState("");
  const [filteredEvents, setFilteredEvents] = useState(events);

  const [showBankDetails, setShowBankDetails] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const [showMap, setShowMap] = useState(false);
  const [mapLocation, setMapLocation] = useState(null);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    filterEvents(e.target.value);
  };

  const filterEvents = (searchTerm) => {
    const lowercasedSearch = searchTerm.toLowerCase();
    const filtered = events.filter(
      (event) =>
        event.title.toLowerCase().includes(lowercasedSearch) ||
        event.description.toLowerCase().includes(lowercasedSearch)
    );
    setFilteredEvents(filtered);
  };

  const handleBookEvent = (eventId) => {
    const event = filteredEvents.find((event) => event.id === eventId);
    setSelectedEvent(event);
    setShowBankDetails(true);
  };

  const handleSubmitBankDetails = () => {
    setShowBankDetails(false);
    setShowConfirmation(true);

    // Update remaining slots for the event
    const updatedEvents = filteredEvents.map((event) => {
      if (event.id === selectedEvent.id && event.remaining > 0) {
        return { ...event, remaining: event.remaining - 1 };
      }
      return event;
    });
    setFilteredEvents(updatedEvents);
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
  };

  const handleMapOpen = (lat, lng) => {
    setMapLocation({ lat, lng });
    setShowMap(true);
  };

  const handleMapClose = () => {
    setShowMap(false);
    setMapLocation(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center dark:bg-black">
      <h1 className="text-4xl font-bold text-center text-text dark:text-darkText mt-8">
      Engage Hub
      </h1>

      {/* Search Bar */}
      <div className="mt-8 mb-4 w-3/4 md:w-1/2">
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="Search for events..."
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
        />
      </div>

      {/* Event Listings (3 Cards per row) */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-8 py-8 gap-6">
        {filteredEvents.length === 0 ? (
          <p className="text-xl text-center text-text dark:text-darkText col-span-3">
            No events found matching your criteria.
          </p>
        ) : (
          filteredEvents.map((event) => (
            <div
              key={event.id}
              className="bg-gray-200 dark:bg-gray-800 p-6 rounded-lg shadow-lg space-y-4 flex flex-col justify-between border-2 hover:border-primary transition-all relative"
            >
              <h2 className="text-2xl font-semibold text-text dark:text-darkText">
                {event.title}
              </h2>
              <p className="text-text dark:text-darkText">
                Date: {event.date} | Time: {event.time}
              </p>
              <p className="text-text dark:text-darkText ">
                Location: {event.location}
              </p>
              <p className="text-lg text-text dark:text-darkText">
                {event.description}
              </p>
              <div className="flex flex-col gap-2 p-2 md:flex-row justify-between items-center">
                <p className="text-lg font-semibold text-text dark:text-darkText">
                  Capacity: {event.capacity} | Remaining: {event.remaining}
                </p>
                <button
                  onClick={() => handleBookEvent(event.id)}
                  className="mt-4 md:mt-0 bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  Book Now
                </button>
                <button
                  onClick={() => handleMapOpen(event.lat, event.lng)}
                  className="mt-4 md:mt-0 bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                >
                  View Location
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Bank Details Modal */}
      {showBankDetails && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center px-4 sm:px-8">
          <div className="bg-white dark:bg-gray-800 dark:text-darkText p-6 sm:p-8 md:p-10 lg:p-12 xl:p-14 w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-center mb-4">
              Enter Bank Details
            </h2>
            {/* Bank Details Form */}
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Bank Name"
                className="w-full p-3 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                placeholder="Account Number"
                className="w-full p-3 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                placeholder="Routing Number"
                className="w-full p-3 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mt-6 flex justify-center">
              <button
                onClick={handleSubmitBankDetails}
                className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Booking Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center px-4 sm:px-8">
          <div className="bg-white dark:bg-gray-800 dark:text-darkText p-6 sm:p-8 md:p-10 lg:p-12 xl:p-14 w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-center mb-4">
              Booking Confirmed
            </h2>
            <p className="text-lg text-center">
              Your booking for {selectedEvent?.title} has been confirmed!
            </p>
            <div className="mt-6 flex justify-center">
              <button
                onClick={handleCloseConfirmation}
                className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Map Modal */}
      {showMap && mapLocation && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center px-4 sm:px-8">
          <div className="bg-white dark:bg-gray-800 dark:text-darkText p-6 sm:p-8 md:p-10 lg:p-12 xl:p-14 w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-center mb-4">
              Event Location
            </h2>
            
            <MapContainer center={[mapLocation.lat, mapLocation.lng]} zoom={13} className="h-80 w-full">
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[mapLocation.lat, mapLocation.lng]}>
                <Popup>{selectedEvent?.location}</Popup>
              </Marker>
            </MapContainer>

            <div className="flex justify-center mt-6">
              <button
                onClick={handleMapClose}
                className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Mapintegration;