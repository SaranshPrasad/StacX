// ==========================================
// src/pages/HomeLayout.jsx
// ==========================================

import { Outlet, useLocation } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function HomeLayout() {

  const location = useLocation();

  const isHome =
    location.pathname === "/home";

  return (
    <div className="min-h-screen bg-[#050816] text-white overflow-x-hidden">

      {/* BACKGROUND */}
      <div className="fixed inset-0 -z-10">

        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-indigo-500/20 rounded-full blur-3xl" />

        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/15 rounded-full blur-3xl" />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-3xl" />

      </div>

      <Navbar />

      <Outlet />

      {isHome && <Footer />}
    </div>
  );
}