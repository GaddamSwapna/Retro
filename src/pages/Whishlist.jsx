import React, { useEffect, useState } from "react";
import axios from "axios";

function Wishlist() {
  const [wishlistGames, setWishlistGames] = useState([]); // Wishlist games only

  // Fetch games with wishlist: true from JSON server
  useEffect(() => {
    axios
      .get("http://localhost:5000/games") // Adjust port or endpoint if needed
      .then((response) => {
        const filteredGames = response.data.filter((game) => game.wishlist);
        setWishlistGames(filteredGames);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gray-100 dark:bg-gray-900">
      <h1 className="text-4xl font-extrabold text-center text-blue-600 mb-8">
        My Wishlist
      </h1>

      {wishlistGames.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {wishlistGames.map((game) => (
            <div
              key={game.id}
              className="border-4 border-blue-400 rounded-lg bg-white shadow-lg hover:shadow-2xl hover:scale-105 transform transition-all duration-300 p-6"
            >
              <h3 className="text-2xl font-bold text-indigo-800 mb-2">
                {game.title}
              </h3>
              <p className="text-gray-600">
                <span className="font-semibold">Platform:</span> {game.platform}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Condition:</span> {game.condition}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Rarity:</span> {game.rarity}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-lg text-gray-500">
          Your wishlist is empty. Start adding games to see them here!
        </p>
      )}
    </div>
  );
}

export default Wishlist;
