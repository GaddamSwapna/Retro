import React, { useState } from "react";

function Playbox() {
  // Sample game data with actual game names (10 cards)
  const initialGames = [
    {
      id: 1,
      title: "Super Mario Bros",
      platform: "NES",
      releaseDate: "1985",
      genre: "Platformer",
      description: "A classic platformer by Nintendo.",
      coverArt: "https://img.freepik.com/premium-photo/super-mario-video-game_1224704-2460.jpg?ga=GA1.1.120565870.1734257353&semt=ais_tags_boosted",
      popularity: 9,
      availability: "Available",
      rating: 4.5,
    },
    {
      id: 2,
      title: "The Legend of Zelda",
      platform: "NES",
      releaseDate: "1986",
      genre: "Adventure",
      description: "An iconic adventure game.",
      coverArt: "https://img.freepik.com/free-photo/fantasy-characters-experiencing-love_23-2151164540.jpg?ga=GA1.1.120565870.1734257353&semt=ais_tags_boosted",
      popularity: 10,
      availability: "Out of Stock",
      rating: 5,
    },
    {
      id: 3,
      title: "Donkey Kong",
      platform: "Arcade",
      releaseDate: "1981",
      genre: "Platformer",
      description: "A classic arcade game featuring Mario.",
      coverArt: "https://img.freepik.com/free-photo/bigfoot-represented-neon-glow_23-2151322837.jpg?ga=GA1.1.120565870.1734257353&semt=ais_tags_boosted",
      popularity: 8,
      availability: "Available",
      rating: 4,
    },
    {
      id: 4,
      title: "Street Fighter II",
      platform: "Arcade",
      releaseDate: "1991",
      genre: "Fighting",
      description: "One of the most influential fighting games.",
      coverArt: "https://img.freepik.com/free-photo/digital-art-style-boxing-day-celebration_23-2151040852.jpg?ga=GA1.1.120565870.1734257353&semt=ais_tags_boosted",
      popularity: 10,
      availability: "Available",
      rating: 4.7,
    },
    {
      id: 5,
      title: "Mega Man 2",
      platform: "NES",
      releaseDate: "1988",
      genre: "Action",
      description: "A popular action platformer.",
      coverArt: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_vJRdT-nCFECYoW4ZHpggiL7HuLio9CABdA&s",
      popularity: 9,
      availability: "Out of Stock",
      rating: 4.2,
    },
    {
      id: 6,
      title: "Pac-Man",
      platform: "Arcade",
      releaseDate: "1980",
      genre: "Arcade",
      description: "The iconic maze-chase game.",
      coverArt: "https://img.freepik.com/free-vector/brick-game-vector-template-mobile-app-play-computer-digital-retro-technology-illustration_1284-42796.jpg?ga=GA1.1.120565870.1734257353&semt=ais_tags_boosted",
      popularity: 10,
      availability: "Available",
      rating: 4.9,
    },
    {
      id: 7,
      title: "Castlevania",
      platform: "NES",
      releaseDate: "1986",
      genre: "Action-Adventure",
      description: "A gothic action-adventure game.",
      coverArt: "https://img.freepik.com/free-photo/mountain-landscape-with-fantasy-style-scene_23-2151124658.jpg?ga=GA1.1.120565870.1734257353&semt=ais_tags_boosted",
      popularity: 8,
      availability: "Out of Stock",
      rating: 4,
    },
    {
      id: 8,
      title: "Tetris",
      platform: "Game Boy",
      releaseDate: "1989",
      genre: "Puzzle",
      description: "The addictive puzzle game.",
      coverArt: "https://img.freepik.com/free-photo/3d-render-abstract-cube-landscape-against-blue-sky-background_1048-14009.jpg?ga=GA1.1.120565870.1734257353&semt=ais_tags_boosted",
      popularity: 10,
      availability: "Available",
      rating: 4.8,
    },
    {
      id: 9,
      title: "Final Fantasy",
      platform: "NES",
      releaseDate: "1987",
      genre: "RPG",
      description: "The legendary RPG that started the franchise.",
      coverArt: "https://img.freepik.com/free-photo/fantasy-characters-experiencing-love_23-2151164450.jpg?ga=GA1.1.120565870.1734257353&semt=ais_tags_boosted",
      popularity: 9,
      availability: "Out of Stock",
      rating: 4.3,
    },
    {
      id: 10,
      title: "Metroid",
      platform: "NES",
      releaseDate: "1986",
      genre: "Action-Adventure",
      description: "A pioneering game in the action-adventure genre.",
      coverArt: "https://img.freepik.com/free-photo/illustrated-rendering-twin-avatar_23-2151061346.jpg?ga=GA1.1.120565870.1734257353&semt=ais_tags_boosted",
      popularity: 8,
      availability: "Available",
      rating: 4.1,
    }
  ];

  // State management
  const [games, setGames] = useState(initialGames);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    platform: "",
    genre: "",
    releaseDate: "",
    availability: "",
  });

  // Filter and search functionality
  const filteredGames = games.filter((game) => {
    return (
      (filters.platform === "" || game.platform === filters.platform) &&
      (filters.genre === "" || game.genre === filters.genre) &&
      (filters.releaseDate === "" || game.releaseDate === filters.releaseDate) &&
      (filters.availability === "" || game.availability === filters.availability) &&
      (search === "" || game.title.toLowerCase().includes(search.toLowerCase()))
    );
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen bg-gray-200 dark:bg-black">
      <h1 className="text-4xl font-bold text-center text-indigo-600 mb-6">Game Catalog</h1>

      {/* Search Bar */}
      <div className="mb-4 max-w-lg mx-auto">
        <input
          type="text"
          placeholder="Search games..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 border-2 border-blue-500 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
        />
      </div>

      {/* Filters */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <select
          value={filters.platform}
          onChange={(e) => setFilters({ ...filters, platform: e.target.value })}
          className="p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Platforms</option>
          <option value="NES">NES</option>
          <option value="SNES">SNES</option>
          <option value="Sega Genesis">Sega Genesis</option>
        </select>

        <select
          value={filters.genre}
          onChange={(e) => setFilters({ ...filters, genre: e.target.value })}
          className="p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Genres</option>
          <option value="Platformer">Platformer</option>
          <option value="Adventure">Adventure</option>
          <option value="RPG">RPG</option>
        </select>

        <select
          value={filters.releaseDate}
          onChange={(e) => setFilters({ ...filters, releaseDate: e.target.value })}
          className="p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Years</option>
          <option value="1985">1985</option>
          <option value="1986">1986</option>
          <option value="1990">1990</option>
        </select>

        <select
          value={filters.availability}
          onChange={(e) => setFilters({ ...filters, availability: e.target.value })}
          className="p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Availability</option>
          <option value="Available">Available</option>
          <option value="Out of Stock">Out of Stock</option>
        </select>
      </div>

      {/* Game Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {filteredGames.map((game) => (
          <div
            key={game.id}
            className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white shadow-xl hover:scale-105 transform transition-all duration-300 rounded-lg overflow-hidden border-2 border-gray-300"
          >
            <img
              src={game.coverArt}
              alt={game.title}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h2 className="text-2xl font-bold mb-2">{game.title}</h2>
              <p className="text-sm mb-2">{game.description}</p>
              <p className="text-gray-100 text-sm">Platform: {game.platform}</p>
              <p className="text-gray-100 text-sm">Release Date: {game.releaseDate}</p>
              <p className="text-gray-100 text-sm">Genre: {game.genre}</p>
              <p className={`text-sm font-semibold ${game.availability === "Available" ? "text-green-300" : "text-red-300"}`}>
                Availability: {game.availability}
              </p>
              <div className="mt-2 flex items-center">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < Math.round(game.rating) ? "text-yellow-300" : "text-gray-400"}>
                    ★
                  </span>
                ))}
                <span className="ml-2 text-sm">{game.rating.toFixed(1)}</span>
              </div>
            </div>
          </div>
        ))}
        {filteredGames.length === 0 && (
          <p className="col-span-full text-center text-gray-500">No games found matching the criteria.</p>
        )}
      </div>
    </div>
  );
}

export default Playbox;
