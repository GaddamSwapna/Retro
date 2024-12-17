import "./App.css";
import { Route, Routes } from "react-router-dom";
import Body from "./components/Body";
import Login from "./pages/Login";
import Contact from "./pages/Contact";
import ProtectedRoute from "./components/ProtectedRoutes";
import { useState, useEffect } from "react";
import UserProfile from "./pages/UserProfile";
import Help from "./components/Help";
import Playbox from "./pages/Playbox";
import Mypicks from "./pages/Mypicks";
import Buysell from "./pages/Buysell";

// Import Stripe dependencies
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Chathub from "./pages/Chathub";
// import Booknow from "./pages/Booknow";
import Guidhub from "./pages/Guidhub";
import Badges from "./pages/Badges";
import Dashboard from "./pages/Dashboard";
import Whishlist from "./pages/Whishlist"; // Fixed Import for Whishlist
import Notification from "./pages/Notification";
import Mapintegration from "./pages/Mapintegration";
import Home from "./pages/Home";

// Initialize Stripe with your public key
const stripePromise = loadStripe("YOUR_STRIPE_PUBLIC_KEY");

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );

  useEffect(() => {
    localStorage.setItem("isAuthenticated", isAuthenticated);
  }, [isAuthenticated]);

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route
          path="/body"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Body />
            </ProtectedRoute>
          }
        >
          {/* Protected Routes under /body */}
          <Route path="home" element={<Home />} />
          <Route path="Playbox" element={<Playbox />} />
        
        
          <Route path="mypicks" element={<Mypicks />} />
          <Route path="whishlist" element={<Whishlist />} />
          <Route path="chathub" element={<Chathub />} />
          {/* <Route path="booknow" element={<Booknow />} /> */}
          <Route path="badges" element={<Badges />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="notification" element={<Notification/>} />
          <Route path="mapintegration" element={<Mapintegration/>} />

          {/* Wrap Buysell in Elements Provider for Stripe functionality */}
          <Route
            path="buysell"
            element={
              <Elements stripe={stripePromise}>
                <Buysell />
              </Elements>
            }
          />

          <Route path="contactUs" element={<Contact />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="help" element={<Help />} />
          <Route path="guidhub" element={<Guidhub />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
