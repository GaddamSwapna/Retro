import { useState, useEffect } from "react";
import { FaBell, FaNewspaper, FaVideo, FaUser, FaHistory, FaCheckCircle } from "react-icons/fa";

function Notification() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [settings, setSettings] = useState({
    breakingNews: true,
    liveStream: true,
    newArticles: true,
    userInteractions: true,
  });

  // Request permission for browser notifications
  useEffect(() => {
    if (notificationsEnabled && Notification.permission !== "granted") {
      Notification.requestPermission().then((permission) => {
        if (permission !== "granted") setNotificationsEnabled(false);
      });
    }
  }, [notificationsEnabled]);

  // Simulated notification triggers
  const sendNotification = (title, body) => {
    if (Notification.permission === "granted") {
      new Notification(title, { body });
    }
  };

  const triggerNotifications = () => {
    if (settings.breakingNews) sendNotification("Breaking News", "A major event has just occurred!");
    if (settings.liveStream) sendNotification("Live Stream", "A live stream is starting now.");
    if (settings.newArticles) sendNotification("New Article", "Check out the new article!");
    if (settings.userInteractions) sendNotification("Interaction", "Someone liked your post!");
  };

  const handleSettingsChange = (e) => {
    const { name, checked } = e.target;
    setSettings((prev) => ({ ...prev, [name]: checked }));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen bg-gray-200 dark:bg-black">
      {/* Main Container */}
      <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden dark:bg-black">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-10 px-8 text-center ">
          <h1 className="text-4xl font-bold flex items-center justify-center gap-3">
            <FaBell /> Notification Center
          </h1>
          <p className="text-lg mt-2">Customize and view your notifications easily</p>
        </div>

        {/* Notification Summary */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Active Notifications Summary */}
          <div className="bg-blue-50 p-6 rounded-2xl shadow-md flex items-center gap-4">
            <FaCheckCircle className="text-blue-600 text-4xl" />
            <div>
              <h2 className="text-xl font-bold text-gray-700">Notifications Enabled</h2>
              <p className="text-gray-600">
                {notificationsEnabled ? "Notifications are active!" : "Notifications are disabled"}
              </p>
            </div>
          </div>

          {/* Active Settings */}
          <div className="bg-purple-50 p-6 rounded-2xl shadow-md flex items-center gap-4">
            <FaNewspaper className="text-purple-600 text-4xl" />
            <div>
              <h2 className="text-xl font-bold text-gray-700">Active Categories</h2>
              <p className="text-gray-600">Breaking News, Live Streams, Articles, Interactions</p>
            </div>
          </div>

          {/* Notifications Test */}
          <div className="bg-yellow-50 p-6 rounded-2xl shadow-md flex items-center gap-4">
            <FaHistory className="text-yellow-500 text-4xl" />
            <div>
              <h2 className="text-xl font-bold text-gray-700">Test Notifications</h2>
              <button
                onClick={triggerNotifications}
                className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full"
              >
                Trigger Test Alerts
              </button>
            </div>
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="px-6 py-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 black:text-white dark:text-white">Notification Preferences</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {[
              { id: "breakingNews", label: "Breaking News", icon: <FaNewspaper className="text-blue-600" /> },
              { id: "liveStream", label: "Live Streams", icon: <FaVideo className="text-purple-600" /> },
              { id: "newArticles", label: "New Articles", icon: <FaNewspaper className="text-green-600" /> },
              { id: "userInteractions", label: "User Interactions", icon: <FaUser className="text-yellow-600" /> },
            ].map((item) => (
              <div key={item.id} className="flex items-center bg-gray-100 p-5 rounded-lg shadow hover:shadow-lg transition">
                <div className="text-3xl mr-4">{item.icon}</div>
                <label className="flex-grow text-gray-700 font-medium">{item.label}</label>
                <input
                  type="checkbox"
                  name={item.id}
                  checked={settings[item.id]}
                  onChange={handleSettingsChange}
                  className="w-6 h-6 accent-blue-600"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Notification History */}
        <div className="px-6 pb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center gap-2 dark:text-white">
            <FaHistory /> Notification History
          </h2>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
              <span className="text-gray-700">🔔 Breaking News Alert - "A major event occurred!"</span>
              <span className="text-sm text-gray-500">2 hours ago</span>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
              <span className="text-gray-700">🔔 New Article Published - "Discover the latest insights"</span>
              <span className="text-sm text-gray-500">Yesterday</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notification;
