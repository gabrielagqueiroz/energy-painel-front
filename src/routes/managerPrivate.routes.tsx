import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Tenants from "../pages/Tenants";
import Stations from "../pages/Stations";
import Map from "../pages/Map";

function ManagerPrivateRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/meus-locatarios" element={<Tenants />} />
      <Route path="/meus-eletropostos" element={<Stations />} />
      <Route path="/mapa" element={<Map />} />
    </Routes>
  );
}

export default ManagerPrivateRoutes;
