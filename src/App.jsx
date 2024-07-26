import { Route, Routes } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import CheckTraffic from "./Pages/checkTraffic";
import Navbar from "./components/Navbar";


export default function App() {
  return (
    <div>

      <Navbar />

      <Routes>
        Hello World

        <Route path="/" element={<LandingPage />} />

        <Route path="/check-traffic" element={<CheckTraffic />} />

      </Routes>
    </div>

  )
}