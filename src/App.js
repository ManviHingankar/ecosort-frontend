import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Contact from "./pages/Contact";
import Services from "./pages/Services";

import UserDashboard from "./pages/user/UserDashboard";
import SchedulePickup from "./pages/user/SchedulePickup";
import MyRequests from "./pages/user/MyRequests";
import TrackPickup from "./pages/user/TrackPickup";
import EcoPoints from "./pages/user/EcoPoints";
import ChatAssistant from "./pages/user/ChatAssistant";
import Profile from "./pages/user/Profile";
import MyEarnings from "./pages/user/MyEarnings";
import Estimator from "./pages/user/Estimator";

import RecyclerDashboard from "./pages/recycler/RecyclerDashboard";
import PickupRequests from "./pages/recycler/PickupRequests";
import MyPickups from "./pages/recycler/MyPickups";
import Earnings from "./pages/recycler/MyEarnings";
import RecyclingCenters from "./pages/recycler/RecyclingCenters";
import RecyclerProfile from "./pages/recycler/RecyclerProfile";
import Help from "./pages/user/Help";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminRecyclers from "./pages/admin/AdminRecyclers";
import AdminPickups from "./pages/admin/AdminPickups";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminAnalytics from "./pages/admin/AdminAnalytics";


function Layout() {

const location = useLocation();

/* hide navbar for dashboard pages */

const hideNavbar =
location.pathname.startsWith("/user") ||
location.pathname.startsWith("/recycler") ||
location.pathname.startsWith("/admin");

return (

<>

{!hideNavbar && <Navbar />}

<Routes>

<Route path="/" element={<Home />} />
<Route path="/about" element={<AboutUs />} />
<Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />

<Route path="/forgot-password" element={<ForgotPassword />} />
<Route path="/reset-password" element={<ResetPassword />} />

<Route path="/contact" element={<Contact />} />
<Route path="/accept" element={<Services />} />

{/* USER ROUTES */}
<Route path="/user/dashboard" element={<UserDashboard />} />
<Route path="/user/schedule" element={<SchedulePickup />} />
<Route path="/user/requests" element={<MyRequests />} />
<Route path="/user/track" element={<TrackPickup />} />
<Route path="/user/ecopoints" element={<EcoPoints />} />
<Route path="/user/profile" element={<Profile />} />
<Route path="/user/help" element={<Help/>}/>
<Route path="/user/my-earnings" element={<MyEarnings />} />
<Route path="/user/estimator" element={<Estimator/>}/>

{/* RECYCLER ROUTES */}
<Route path="/recycler/dashboard" element={<RecyclerDashboard />} />
<Route path="/recycler/requests" element={<PickupRequests />} />
<Route path="/recycler/mypickups" element={<MyPickups />} />
<Route path="/recycler/earnings" element={<Earnings />} />
<Route path="/recycler/centers" element={<RecyclingCenters/>} />
<Route path="/recycler/profile" element={<RecyclerProfile />} />

<Route path="/admin/dashboard" element={<AdminDashboard/>}/>
<Route path="/admin/recyclers" element={<AdminRecyclers/>}/>
<Route path="/admin/pickups" element={<AdminPickups />} />
<Route path="/admin/users" element={<AdminUsers />} />
<Route path="/admin/analytics" element={<AdminAnalytics />} />

</Routes>

<ChatAssistant />

</>

);

}

function App() {

return (

<Router>
<Layout />
</Router>

);

}

export default App;