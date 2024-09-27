import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";

export function PublicRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
    </Routes>
  );
}
