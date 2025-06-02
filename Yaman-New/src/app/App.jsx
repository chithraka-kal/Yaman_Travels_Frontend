import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import HomePage from "../pages/HomePage.jsx";
import Destinations from "../pages/Destinations.jsx";
import Packages from "../pages/Packages.jsx";
import Services from "../pages/Services.jsx";
import AboutUs from "../pages/AboutUs.jsx";
import ContactUs from "../pages/ContactUs.jsx";

function App() {
  console.log("App component loaded");

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
      </Routes>
    </Router>
  );
}

export default App;
