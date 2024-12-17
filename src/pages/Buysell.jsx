import React, { useState } from "react";

function Buysell() {
  const [tradeListings, setTradeListings] = useState([
    {
      id: 1,
      title: "The Last of Us Part II",
      platform: "PS4",
      condition: "Used",
      rarity: "Rare",
      type: "trade",
    },
    {
      id: 2,
      title: "Minecraft",
      platform: "Xbox One",
      condition: "New",
      rarity: "Common",
      type: "trade",
    },
    {
      id: 3,
      title: "Red Dead Redemption 2",
      platform: "PS4",
      condition: "Used",
      rarity: "Uncommon",
      type: "trade",
    },
  ]);
  
  const [marketplaceListings, setMarketplaceListings] = useState([]);
  const [newListing, setNewListing] = useState({
    title: "",
    platform: "",
    condition: "",
    rarity: "",
    price: "",
    type: "trade",
  });

  const [showModal, setShowModal] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [transactions, setTransactions] = useState([]);

  // Handle Buy Action
  const handleBuyNow = (listing) => {
    setSelectedListing(listing);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedListing(null);
    setCardNumber("");
    setCvv("");
    setPaymentSuccess(false);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    if (!cardNumber || !cvv) {
      alert("Please enter valid payment details.");
      return;
    }

    setPaymentSuccess(true);

    // Record the transaction
    const transaction = {
      id: Date.now(),
      buyer: "User123",
      game: selectedListing.title,
      price: selectedListing.price,
      date: new Date().toLocaleString(),
    };

    setTransactions([...transactions, transaction]);

    setTimeout(() => {
      closeModal();
    }, 2000);
  };

  const addListing = () => {
    if (
      newListing.title &&
      newListing.platform &&
      newListing.condition &&
      newListing.rarity &&
      (newListing.type === "sale" ? newListing.price : true)
    ) {
      const listing = { ...newListing, id: Date.now() };
      if (newListing.type === "trade") {
        setTradeListings([...tradeListings, listing]);
      } else {
        setMarketplaceListings([...marketplaceListings, listing]);
      }
      setNewListing({
        title: "",
        platform: "",
        condition: "",
        rarity: "",
        price: "",
        type: "trade",
      });
    } else {
      alert("Please fill all the required fields.");
    }
  };

  const removeListing = (id, type) => {
    if (type === "trade") {
      setTradeListings(tradeListings.filter((listing) => listing.id !== id));
    } else {
      setMarketplaceListings(
        marketplaceListings.filter((listing) => listing.id !== id)
      );
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen bg-gray-200 dark:bg-black">
      <h1 className="text-5xl font-bold text-center mb-10 dark:text-white">Buy & Sell Games</h1>

      {/* Trade Listings */}
      <div>
        <h2 className="text-3xl mb-4 dark:text-white">Trade Listings</h2>
        {tradeListings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tradeListings.map((listing) => (
              <div
                key={listing.id}
                className="bg-gradient-to-r from-teal-400 to-teal-600 p-4 rounded-lg shadow-md"
              >
                <h3 className="text-xl font-bold">{listing.title}</h3>
                <p>Platform: {listing.platform}</p>
                <p>Condition: {listing.condition}</p>
                <p>Rarity: {listing.rarity}</p>
                <button
                  onClick={() => removeListing(listing.id, "trade")}
                  className="mt-2 bg-red-500 px-3 py-2 rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p>No trade listings available.</p>
        )}
      </div>

      {/* Marketplace Listings */}
      <div className="mt-12">
        <h2 className="text-3xl mb-4 dark:text-white">Marketplace Listings</h2>
        {marketplaceListings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {marketplaceListings.map((listing) => (
              <div
                key={listing.id}
                className="bg-gradient-to-r from-pink-400 to-pink-600 p-4 rounded-lg shadow-md"
              >
                <h3 className="text-xl font-bold">{listing.title}</h3>
                <p>Platform: {listing.platform}</p>
                <p>Condition: {listing.condition}</p>
                <p>Rarity: {listing.rarity}</p>
                <p>Price: ${listing.price}</p>
                <button
                  onClick={() => handleBuyNow(listing)}
                  className="mt-2 bg-blue-500 px-3 py-2 rounded hover:bg-blue-600"
                >
                  Buy Now
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="dark:text-white">No marketplace listings available.</p>
        )}
      </div>

      {/* Add New Listing */}
      <div className="mt-12">
        <h2 className="text-3xl mb- dark:text-white">Create a Listing</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Game Title"
            value={newListing.title}
            onChange={(e) =>
              setNewListing({ ...newListing, title: e.target.value })
            }
            className="p-2 rounded text-black"
          />
          <input
            type="text"
            placeholder="Platform"
            value={newListing.platform}
            onChange={(e) =>
              setNewListing({ ...newListing, platform: e.target.value })
            }
            className="p-2 rounded text-black"
          />
          <select
            value={newListing.condition}
            onChange={(e) =>
              setNewListing({ ...newListing, condition: e.target.value })
            }
            className="p-2 rounded text-black"
          >
            <option value="">Condition</option>
            <option value="New">New</option>
            <option value="Used">Used</option>
          </select>
          <select
            value={newListing.rarity}
            onChange={(e) =>
              setNewListing({ ...newListing, rarity: e.target.value })
            }
            className="p-2 rounded text-black"
          >
            <option value="">Rarity</option>
            <option value="Common">Common</option>
            <option value="Uncommon">Uncommon</option>
            <option value="Rare">Rare</option>
          </select>
          <input
            type="number"
            placeholder="Price (if for sale)"
            value={newListing.price}
            onChange={(e) =>
              setNewListing({ ...newListing, price: e.target.value })
            }
            className="p-2 rounded text-black"
          />
          <select
            value={newListing.type}
            onChange={(e) =>
              setNewListing({ ...newListing, type: e.target.value })
            }
            className="p-2 rounded text-black"
          >
            <option value="trade">Trade</option>
            <option value="sale">Sale</option>
          </select>
          <button
            onClick={addListing}
            className="bg-green-500 p-2 rounded hover:bg-green-600"
          >
            Add Listing
          </button>
        </div>
      </div>

      {/* Payment Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            {paymentSuccess ? (
              <p className="text-green-500 text-center">Payment Successful!</p>
            ) : (
              <form onSubmit={handlePaymentSubmit}>
                <h3 className="text-xl mb-4 text-black">Enter Payment Details</h3>
                <input
                  type="text"
                  placeholder="Card Number"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="p-2 mb-4 w-full rounded border text-black"
                />
                <input
                  type="text"
                  placeholder="CVV"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  className="p-2 mb-4 w-full rounded border text-black"
                />
                <button
                  type="submit"
                  className="bg-blue-500 p-2 w-full text-white rounded hover:bg-blue-600"
                >
                  Submit Payment
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Transaction History */}
      <div className="mt-12">
        <h2 className="text-3xl mb-4">Transaction History</h2>
        {transactions.length > 0 ? (
          <div>
            {transactions.map((transaction) => (
              <div key={transaction.id} className="bg-gray-800 p-4 mb-4 rounded">
                <p>Buyer: {transaction.buyer}</p>
                <p>Game: {transaction.game}</p>
                <p>Price: ${transaction.price}</p>
                <p>Date: {transaction.date}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No transactions yet.</p>
        )}
      </div>
    </div>
  );
}

export default Buysell;
