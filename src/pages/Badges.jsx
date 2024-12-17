import React, { useState } from "react";

// Dummy data for leaderboards and achievements
const leaderboardData = [
  {
    rank: 1,
    username: "Swapna",
    score: 2500,
    achievements: 15,
    games: [
      { gameName: "Game A", score: 1000, killed: 25, ratio: 2.5, matchesPlayed: 10 },
      { gameName: "Game B", score: 1500, killed: 30, ratio: 3.0, matchesPlayed: 12 },
    ],
    badges: ["🔥", "🏆"]
  },
  {
    rank: 2,
    username: "Sowmya",
    score: 2300,
    achievements: 12,
    games: [
      { gameName: "Game A", score: 800, killed: 20, ratio: 2.0, matchesPlayed: 8 },
      { gameName: "Game C", score: 1500, killed: 35, ratio: 3.5, matchesPlayed: 15 },
    ],
    badges: ["🔥"]
  },
  // Add other players...
];

const achievementsData = [
  { title: "Mythical Beast", description: "Unlock all mythical creature skins", badge: "🏆" },
  { title: "Top Gamer", description: "Achieve a score of 2000 or more", badge: "🔥" },
  { title: "Explorer", description: "Visit all in-game locations", badge: "🗺" },
];

const Victory = ({ winner }) => {
  return (
    <div className="bg-indigo-500 text-white p-6 rounded-xl mt-8 shadow-md">
      <h2 className="text-2xl font-bold text-center">Victory!</h2>
      <p className="mt-4 text-lg text-center">{winner} has claimed the top spot!</p>
      <p className="mt-3 text-sm text-center">Keep up the awesome work!</p>
    </div>
  );
};

const Leaderboards = ({ onPlayerClick }) => {
  const topPlayer = leaderboardData[0].username;

  return (
    <div className="bg-white text-black p-6 rounded-xl shadow-lg mt-8">
      <h2 className="text-3xl font-semibold mb-5 text-center">Leaderboard</h2>
      <Victory winner={topPlayer} />
      <div className="overflow-x-auto mt-6">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="border-b border-gray-300">
              <th className="px-6 py-3 text-left">Rank</th>
              <th className="px-6 py-3 text-left">Username</th>
              <th className="px-6 py-3 text-left">Score</th>
              <th className="px-6 py-3 text-left">Achievements</th>
              <th className="px-6 py-3 text-left">Badges</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData.map((player) => (
              <tr
                key={player.rank}
                className="hover:bg-gray-100 cursor-pointer transition-all"
              >
                <td className="px-6 py-3">{player.rank}</td>
                <td
                  className="px-6 py-3 text-blue-600"
                  onClick={() => onPlayerClick(player.username)}
                >
                  {player.username}
                </td>
                <td className="px-6 py-3">{player.score}</td>
                <td className="px-6 py-3">{player.achievements}</td>
                <td className="px-6 py-3">
                  {player.badges.map((badge, index) => (
                    <span key={index} className="text-2xl mr-2">{badge}</span>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Achievements = () => {
  return (
    <div className="bg-white text-black p-6 rounded-xl shadow-lg mt-8">
      <h2 className="text-3xl font-semibold mb-5 text-center">Achievements</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {achievementsData.map((achievement, index) => (
          <div
            key={index}
            className="bg-gray-100 rounded-lg p-6 text-center border-2 border-gray-300 hover:bg-indigo-100 transition-all"
          >
            <div className="text-5xl mb-5">{achievement.badge}</div>
            <h3 className="text-xl font-semibold">{achievement.title}</h3>
            <p className="text-sm mt-2">{achievement.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const Badges = () => {
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const handlePlayerClick = (username) => {
    const player = leaderboardData.find((player) => player.username === username);
    setSelectedPlayer(player);
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center text-indigo-600 mb-12">Steps to Glory</h1>

      <Leaderboards onPlayerClick={handlePlayerClick} />

      {selectedPlayer && (
        <div className="bg-white text-black p-6 mt-8 rounded-xl shadow-lg">
          <h2 className="text-3xl font-semibold mb-6 text-center">{selectedPlayer.username}'s Games</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="border-b border-gray-300">
                  <th className="px-6 py-3 text-left">Game</th>
                  <th className="px-6 py-3 text-left">Score</th>
                  <th className="px-6 py-3 text-left">Kills</th>
                  <th className="px-6 py-3 text-left">Ratio</th>
                  <th className="px-6 py-3 text-left">Matches</th>
                </tr>
              </thead>
              <tbody>
                {selectedPlayer.games.map((game, index) => (
                  <tr key={index} className="hover:bg-gray-100 transition-all">
                    <td className="px-6 py-3">{game.gameName}</td>
                    <td className="px-6 py-3">{game.score}</td>
                    <td className="px-6 py-3">{game.killed}</td>
                    <td className="px-6 py-3">{game.ratio}</td>
                    <td className="px-6 py-3">{game.matchesPlayed}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <Achievements />
    </div>
  );
};

export default Badges;
