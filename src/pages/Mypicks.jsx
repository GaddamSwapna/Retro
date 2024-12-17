import React, { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import axios from "axios";

function Mypicks() {
  const [games, setGames] = useState([]); // All games fetched from the server
  const [wishlist, setWishlist] = useState([]); // Games in the wishlist
  const [collection, setCollection] = useState([]); // Games in the collection

  // Fetch games from the JSON server on component mount
  useEffect(() => {
    axios
      .get("http://localhost:5000/games")
      .then((response) => {
        setGames(response.data);
        setWishlist(response.data.filter((game) => game.wishlist)); // Populate wishlist
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Toggle wishlist status in JSON Server
  const updateWishlistStatus = (gameId) => {
    const gameToUpdate = games.find((game) => game.id === gameId);
    if (gameToUpdate) {
      const newStatus = !gameToUpdate.wishlist; // Toggle wishlist status

      // Update the JSON server
      axios
        .patch(`http://localhost:5000/games/${gameId}`, { wishlist: newStatus })
        .then(() => {
          // Update local games state
          setGames((prevGames) =>
            prevGames.map((game) =>
              game.id === gameId ? { ...game, wishlist: newStatus } : game
            )
          );

          // Update wishlist state
          if (newStatus) {
            setWishlist([...wishlist, { ...gameToUpdate, wishlist: newStatus }]);
          } else {
            setWishlist(wishlist.filter((game) => game.id !== gameId));
          }
        })
        .catch((error) =>
          console.error("Error updating wishlist status:", error)
        );
    }
  };

  // Add game to collection
  const addToCollection = (game) => {
    if (!collection.some((item) => item.id === game.id)) {
      setCollection([...collection, game]);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-white dark:bg-black">
      <h1 className="text-4xl font-extrabold text-center text-blue-600 mb-8">
        My Picks
      </h1>
      <nav className="flex justify-center gap-8 mb-8">
        {/* <Link to="/" className="text-blue-500 hover:underline">
          Available Games
        </Link> */}
        {/* <Link to="/wishlist" className="text-blue-500 hover:underline">
          Wishlist
        </Link> */}
        {/* <Link to="/collection" className="text-blue-500 hover:underline">
          My Collection
        </Link> */}
      </nav>

      <Routes>
        {/* Available Games */}
        <Route
          path="/"
          element={
            <div>
              {/* <h2 className="text-3xl font-semibold mb-4 text-blue-700">
                Available Games
              </h2> */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {games.map((game) => (
                  <div
                    key={game.id}
                    className="border-4 bg-white shadow-xl rounded-lg p-6 hover:scale-105 transform transition-all duration-300"
                  >
                    <h3 className="text-2xl font-bold text-indigo-800 mb-2">
                      {game.title}
                    </h3>
                    <p className="text-gray-600">Platform: {game.platform}</p>
                    <p className="text-gray-600">Condition: {game.condition}</p>
                    <p className="text-gray-600">Rarity: {game.rarity}</p>
                    <div className="flex gap-4 mt-6">
                      <button
                        className={`px-4 py-2 rounded-lg text-white ${
                          game.wishlist
                            ? "bg-red-500 hover:bg-red-600"
                            : "bg-blue-500 hover:bg-blue-600"
                        }`}
                        onClick={() => updateWishlistStatus(game.id)}
                      >
                        {game.wishlist
                          ? "Remove from Wishlist"
                          : "Add to Wishlist"}
                      </button>
                      {/* <button
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                        onClick={() => addToCollection(game)}
                      >
                        Add to Collection
                      </button> */}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          }
        />

        {/* Wishlist Page */}
        <Route
          path="/wishlist"
          element={
            <div>
              <h2 className="text-3xl font-semibold mb-4 text-indigo-700">
                Wishlist
              </h2>
              {wishlist.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {wishlist.map((game) => (
                    <div key={game.id} className="border-2 p-4 shadow rounded">
                      <h3 className="text-xl font-bold">{game.title}</h3>
                      <p>Platform: {game.platform}</p>
                      <p>Condition: {game.condition}</p>
                      <p>Rarity: {game.rarity}</p>
                      <button
                        className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        onClick={() => updateWishlistStatus(game.id)}
                      >
                        Remove from Wishlist
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p>Your wishlist is empty.</p>
              )}
            </div>
          }
        />

        {/* Collection Page */}
        <Route
          path="/collection"
          element={
            <div>
              <h2 className="text-3xl font-semibold mb-4 text-green-700">
                My Collection
              </h2>
              {collection.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {collection.map((game) => (
                    <div key={game.id} className="border-2 p-4 shadow rounded">
                      <h3 className="text-xl font-bold">{game.title}</h3>
                      <p>Platform: {game.platform}</p>
                      <p>Condition: {game.condition}</p>
                      <p>Rarity: {game.rarity}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p>Your collection is empty.</p>
              )}
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default Mypicks;
