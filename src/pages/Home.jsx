'use client'

import React from 'react'

const  Home = () =>{
  const popularGames = [
    { id: 1, title: "HELLDIVERS 2", price: "$29.06", image: "https://www.shutterstock.com/shutterstock/photos/2503384889/display_1500/stock-photo-abstract-image-of-dark-room-concrete-floor-stage-or-black-room-background-for-product-placement-2503384889.jpg", discount: "-20%" },
    { id: 2, title: "The Outer Worlds", price: "$29.99", image: "https://img.freepik.com/free-photo/high-tech-view-futuristic-earth_23-2151100361.jpg?ga=GA1.1.120565870.1734257353&semt=ais_tags_boosted/", discount: "-50%" },
    { id: 3, title: "Path of Exile 2", price: "$29.99", image: "https://img.freepik.com/free-photo/fantasy-journey-painting-illustration_1409-6189.jpg?ga=GA1.1.120565870.1734257353&semt=ais_tags_boosted", discount: "" },
    { id: 4, title: "Forza Horizon 4", price: "$58.69", image: "https://img.freepik.com/free-photo/fantasy-journey-painting-illustration_1409-6189.jpg?ga=GA1.1.120565870.1734257353&semt=ais_tags_boosted", discount: "-40%" },
    { id: 5, title: "FINAL FANTASY XIV REBIRTH", price: "$24.06", image: "https://img.freepik.com/free-photo/fantasy-journey-painting-illustration_1409-6189.jpg?ga=GA1.1.120565870.1734257353&semt=ais_tags_boosted", discount: "-25%" }
  ]

  const newDeals = [
    { id: 1, title: "Spelunky 2 + Soundtrack Bundle", price: "$9.33", image: "https://www.shutterstock.com/shutterstock/photos/2503384889/display_1500/stock-photo-abstract-image-of-dark-room-concrete-floor-stage-or-black-room-background-for-product-placement-2503384889.jpg", discount: "-60%" },
    { id: 2, title: "Spelunky 2", price: "$7.99", image: "https://img.freepik.com/free-photo/busy-bee-pollinating-plants-collecting-sweet-honey-generated-by-ai_188544-14420.jpg?ga=GA1.1.120565870.1734257353&semt=ais_tags_boosted", discount: "-60%" },
    { id: 3, title: "Starship Troopers: Extermination", price: "$24.99", image: "https://img.freepik.com/premium-photo/futuristic-battlefield-robotic-squad-smoky-outfield_717732-11191.jpg?ga=GA1.1.120565870.1734257353&semt=ais_tags_boosted", discount: "-17%" },
    { id: 4, title: "Going Medieval", price: "$14.99", image: "https://img.freepik.com/free-photo/man-dreamy-unicorn-nature_23-2151579493.jpg?ga=GA1.1.120565870.1734257353&semt=ais_tags_boosted", discount: "-40%" },
    { id: 5, title: "Wartales", price: "$27.99", image: "https://img.freepik.com/free-photo/man-dreamy-unicorn-nature_23-2151579493.jpg?ga=GA1.1.120565870.1734257353&semt=ais_tags_boosted", discount: "-30%" }
  ]

  const bestDeals = [
    { id: 1, title: "Persona 5 Golden", price: "$12.99", image: "https://img.freepik.com/free-photo/man-dreamy-unicorn-nature_23-2151579493.jpg?ga=GA1.1.120565870.1734257353&semt=ais_tags_boosted", discount: "-57%" },
    { id: 2, title: "Dragon Age: The Wicked EP", price: "$21.11", image: "https://img.freepik.com/free-photo/man-dreamy-unicorn-nature_23-2151579493.jpg?ga=GA1.1.120565870.1734257353&semt=ais_tags_boosted", discount: "-33%" },
    { id: 3, title: "Persona 3 Portable", price: "$12.99", image: "https://img.freepik.com/free-photo/man-dreamy-unicorn-nature_23-2151579493.jpg?ga=GA1.1.120565870.1734257353&semt=ais_tags_boosted", discount: "-57%" },
    { id: 4, title: "Sackboy: A Big Adventure", price: "$29.99", image: "https://img.freepik.com/free-photo/man-dreamy-unicorn-nature_23-2151579493.jpg?ga=GA1.1.120565870.1734257353&semt=ais_tags_boosted", discount: "-50%" },
    { id: 5, title: "Hogwarts Legacy", price: "$29.99", image: "https://img.freepik.com/free-photo/man-dreamy-unicorn-nature_23-2151579493.jpg?ga=GA1.1.120565870.1734257353&semt=ais_tags_boosted", discount: "-50%" }
  ]

  return (
    <div className="min-h-screen bg-gray-900 text-white">
  

      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Most Popular Games</h2>
            <button className="text-sm text-gray-400 hover:text-white">SEE ALL</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {popularGames.map(game => (
              <div key={game.id} className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-700 transition-colors duration-200">
                <img src={game.image} alt={game.title} className="w-full h-32 object-cover" />
                <div className="p-4">
                  <h3 className="font-medium text-sm truncate">{game.title}</h3>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-green-500 text-sm">{game.discount}</span>
                    <span className="text-sm">{game.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">New deals</h2>
            <button className="text-sm text-gray-400 hover:text-white">SEE ALL</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {newDeals.map(game => (
              <div key={game.id} className="bg-gray-800 rounded-lg overflow-hidden flex hover:bg-gray-700 transition-colors duration-200">
                <img src={game.image} alt={game.title} className="w-20 h-20 object-cover" />
                <div className="p-4 flex-1">
                  <h3 className="font-medium text-sm truncate">{game.title}</h3>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-green-500 text-sm">{game.discount}</span>
                    <span className="text-sm">{game.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Best deals</h2>
            <button className="text-sm text-gray-400 hover:text-white">SEE ALL</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {bestDeals.map(game => (
              <div key={game.id} className="bg-gray-800 rounded-lg overflow-hidden flex hover:bg-gray-700 transition-colors duration-200">
                <img src={game.image} alt={game.title} className="w-20 h-20 object-cover" />
                <div className="p-4 flex-1">
                  <h3 className="font-medium text-sm truncate">{game.title}</h3>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-green-500 text-sm">{game.discount}</span>
                    <span className="text-sm">{game.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
export default  Home;
