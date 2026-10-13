// // ==========================================
// // src/pages/HomeLayout.jsx
// // ==========================================

// import { Outlet, useLocation } from "react-router-dom";

// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";

// export default function HomeLayout() {

//   const location = useLocation();

//   const isHome =
//     location.pathname === "/home";

//   return (
//     <div className="min-h-screen bg-[#050816] text-white overflow-x-hidden">

//       {/* BACKGROUND */}
//       <div className="fixed inset-0 -z-10">

//         <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-indigo-500/20 rounded-full blur-3xl" />

//         <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/15 rounded-full blur-3xl" />

//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-3xl" />

//       </div>

//       <Navbar />

//       <Outlet />

//       {isHome && <Footer />}
//     </div>
//   );
// }


// ==========================================
// src/pages/HomeLayout.jsx
// ==========================================

import { Outlet, useLocation } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function HomeLayout() {
  const location = useLocation();

  const isHome = location.pathname === "/home";

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#F6F9FF] text-slate-800">
      {/* Subtle light-blue background */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-blue-200/30 blur-3xl" />

        <div className="absolute right-0 top-1/3 h-80 w-80 rounded-full bg-sky-200/20 blur-3xl" />

        <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-indigo-100/30 blur-3xl" />
      </div>

      <Navbar />

      <main className="relative min-h-[calc(100vh-72px)]">
        <Outlet />
      </main>

      {isHome && <Footer />}
    </div>
  );
}
