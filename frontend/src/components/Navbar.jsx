

// import { useState } from "react";
// import {
//   Home,
//   Bell,
//   MessageCircle,
//   User,
//   LogOut,
//   LogIn,
//   Sparkles,
//   FolderOpen,
//   ClipboardList,
//   BadgeCheck,
//   Menu,
//   X,
// } from "lucide-react";

// export default function Navbar({ activeTab, setActiveTab }) {
//   const token = localStorage.getItem("token");
//   const [mobileOpen, setMobileOpen] = useState(false);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     window.location.reload();
//   };

//   const navItems = [
//     { key: "home", label: "Home", icon: <Home size={18} /> },
//     { key: "chat", label: "Chat", icon: <MessageCircle size={18} /> },
//     { key: "resources", label: "Resources", icon: <FolderOpen size={18} /> },
//     { key: "myrequests", label: "My Requests", icon: <ClipboardList size={18} /> },
//     { key: "notifications", label: "Notifications", icon: <BadgeCheck size={18} /> },
//     { key: "profile", label: "Profile", icon: <User size={18} /> },
//   ];

//   // Shared nav link generator
//   const NavLink = ({ item }) => (
//     <button
//       onClick={() => {
//         setActiveTab(item.key);
//         setMobileOpen(false);
//       }}
//       className={`flex items-center gap-3 px-5 py-3 rounded-full whitespace-nowrap font-medium transition-all duration-300 ${
//         activeTab === item.key
//           ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/30"
//           : "text-gray-400 hover:text-white hover:bg-white/5"
//       }`}
//     >
//       {item.icon}
//       {item.label}
//     </button>
//   );

//   // Mobile nav link (vertical list)
//   const MobileNavLink = ({ item }) => (
//     <button
//       onClick={() => {
//         setActiveTab(item.key);
//         setMobileOpen(false);
//       }}
//       className={`flex items-center gap-3 w-full px-5 py-3 rounded-2xl font-medium transition-all duration-300 ${
//         activeTab === item.key
//           ? "bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-indigo-400 border border-indigo-500/20"
//           : "text-gray-400 hover:text-white hover:bg-white/5"
//       }`}
//     >
//       {item.icon}
//       {item.label}
//     </button>
//   );

//   return (
//     <>
//       {/* ====================================== */}
//       {/* DESKTOP NAVBAR — unchanged, gorgeous */}
//       {/* ====================================== */}
//       <div className="hidden md:flex fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[97%] max-w-[1700px]">
//         <div className="w-full backdrop-blur-2xl bg-white/[0.04] border border-white/10 rounded-[28px] px-6 py-4 flex items-center justify-between shadow-[0_8px_40px_rgba(0,0,0,0.4)]">

//           {/* LOGO */}
//           <div className="flex items-center gap-3 cursor-pointer">
//             <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
//               <Sparkles size={18} className="text-white" />
//             </div>
//             <div>
//               <h1 className="text-2xl font-black tracking-tight bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
//                 StacX
//               </h1>
//               <p className="text-[11px] text-gray-500 -mt-1">
//                 Smart Notes Platform
//               </p>
//             </div>
//           </div>

//           {/* NAV LINKS */}
//           <div className="flex items-center gap-2 bg-black/20 border border-white/5 rounded-full p-2 overflow-x-auto scrollbar-hide">
//             {navItems.map((item) => (
//               <NavLink key={item.key} item={item} />
//             ))}
//           </div>

//           {/* AUTH BUTTON */}
//           {token ? (
//             <button
//               onClick={handleLogout}
//               className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white border border-red-500/20 px-5 py-3 rounded-2xl transition-all duration-300"
//             >
//               <LogOut size={18} />
//               Logout
//             </button>
//           ) : (
//             <button
//               onClick={() => (window.location.href = "/auth")}
//               className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 hover:opacity-90 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg shadow-indigo-500/30 transition-all duration-300"
//             >
//               <LogIn size={18} />
//               Login
//             </button>
//           )}
//         </div>
//       </div>

//       {/* ====================================== */}
//       {/* MOBILE — Top bar + slide-out drawer   */}
//       {/* ====================================== */}

//       {/* Top Bar */}
//       <div className="md:hidden fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[94%]">
//         <div className="backdrop-blur-3xl bg-white/[0.06] border border-white/10 rounded-2xl px-5 py-3 flex items-center justify-between shadow-2xl">
//           {/* LOGO */}
//           <div className="flex items-center gap-2 cursor-pointer">
//             <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
//               <Sparkles size={15} className="text-white" />
//             </div>
//             <h1 className="text-xl font-black bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
//               StacX
//             </h1>
//           </div>

//           {/* HAMBURGER */}
//           <button
//             onClick={() => setMobileOpen(!mobileOpen)}
//             className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
//               mobileOpen
//                 ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
//                 : "bg-white/5 text-gray-300 hover:bg-white/10"
//             }`}
//           >
//             {mobileOpen ? <X size={20} /> : <Menu size={20} />}
//           </button>
//         </div>
//       </div>

//       {/* Slide-Out Drawer Overlay */}
//       <div
//         className={`md:hidden fixed inset-0 z-[60] transition-all duration-500 ${
//           mobileOpen ? "opacity-100 visible" : "opacity-0 invisible"
//         }`}
//       >
//         {/* Backdrop */}
//         <div
//           className="absolute inset-0 bg-black/70 backdrop-blur-sm"
//           onClick={() => setMobileOpen(false)}
//         />

//         {/* Drawer Panel — slides from right */}
//         <div
//           className={`absolute top-0 right-0 w-[80%] max-w-[320px] h-full bg-[#0a0a0f] border-l border-white/10 backdrop-blur-3xl flex flex-col transition-transform duration-500 ease-out ${
//             mobileOpen ? "translate-x-0" : "translate-x-full"
//           }`}
//         >
//           {/* Drawer Header */}
//           <div className="px-5 pt-6 pb-4 border-b border-white/5 flex items-center gap-3">
//             <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-500 flex items-center justify-center">
//               <Sparkles size={16} className="text-white" />
//             </div>
//             <div>
//               <h2 className="text-lg font-black bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
//                 StacX
//               </h2>
//               <p className="text-[10px] text-gray-500 -mt-0.5">
//                 Smart Notes Platform
//               </p>
//             </div>
//           </div>

//           {/* Nav Links */}
//           <div className="flex-1 overflow-y-auto px-4 py-5 flex flex-col gap-1.5 scrollbar-hide">
//             {navItems.map((item) => (
//               <MobileNavLink key={item.key} item={item} />
//             ))}
//           </div>

//           {/* Auth Button at bottom */}
//           <div className="px-4 pb-6 pt-2 border-t border-white/5">
//             {token ? (
//               <button
//                 onClick={handleLogout}
//                 className="w-full bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white border border-red-500/20 py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-300"
//               >
//                 <LogOut size={18} />
//                 Logout
//               </button>
//             ) : (
//               <button
//                 onClick={() => {
//                   setMobileOpen(false);
//                   window.location.href = "/auth";
//                 }}
//                 className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:opacity-90 text-white py-3 rounded-xl font-semibold shadow-lg shadow-indigo-500/30 flex items-center justify-center gap-2 transition-all duration-300"
//               >
//                 <LogIn size={18} />
//                 Login
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
// ==========================================
// src/components/Navbar.jsx
// ==========================================

import { useState } from "react";

import {
  Home,
  MessageCircle,
  User,
  LogOut,
  LogIn,
  Sparkles,
  FolderOpen,
  ClipboardList,
  BadgeCheck,
  Menu,
  X,
} from "lucide-react";

import {
  NavLink,
  useNavigate,
} from "react-router-dom";

export default function Navbar() {

  const token =
    localStorage.getItem("token");

  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] =
    useState(false);

  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    navigate("/auth");
  };

  const navItems = [
    {
      path: "/home",
      label: "Home",
      icon: <Home size={18} />,
    },

    {
      path: "/home/chat",
      label: "Chat",
      icon: <MessageCircle size={18} />,
    },

    {
      path: "/home/resources",
      label: "Resources",
      icon: <FolderOpen size={18} />,
    },

    {
      path: "/home/myrequests",
      label: "My Requests",
      icon: <ClipboardList size={18} />,
    },

    {
      path: "/home/notifications",
      label: "Notifications",
      icon: <BadgeCheck size={18} />,
    },

    {
      path: "/home/profile",
      label: "Profile",
      icon: <User size={18} />,
    },
  ];

const DesktopNavLink = ({ item }) => (
  <NavLink
    to={item.path}
    end={item.path === "/home"}
    className={({ isActive }) =>
      `flex items-center gap-3 px-5 py-3 rounded-full whitespace-nowrap font-medium transition-all duration-300 
      ${
        isActive
          ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/30"
          : "text-gray-400 hover:text-white hover:bg-white/5"
      }`
    }
  >
    {item.icon}
    {item.label}
  </NavLink>
);

 const MobileNavLink = ({ item }) => (
  <NavLink
    to={item.path}
    end={item.path === "/home"}
    onClick={() => setMobileOpen(false)}
    className={({ isActive }) =>
      `flex items-center gap-3 w-full px-5 py-3 rounded-2xl font-medium transition-all duration-300 ${
        isActive
          ? "bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-indigo-400 border border-indigo-500/20"
          : "text-gray-400 hover:text-white hover:bg-white/5"
      }`
    }
  >
    {item.icon}
    {item.label}
  </NavLink>
);

  return (
    <>
      {/* DESKTOP */}

      <div className="hidden md:flex fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[97%] max-w-[1700px]">

        <div className="w-full backdrop-blur-2xl bg-white/[0.04] border border-white/10 rounded-[28px] px-6 py-4 flex items-center justify-between shadow-[0_8px_40px_rgba(0,0,0,0.4)]">

          {/* LOGO */}

          <div
            onClick={() => navigate("/home")}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Sparkles
                size={18}
                className="text-white"
              />
            </div>

            <div>
              <h1 className="text-2xl font-black tracking-tight bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                StacX
              </h1>

              <p className="text-[11px] text-gray-500 -mt-1">
                Smart Notes Platform
              </p>
            </div>
          </div>

          {/* NAV */}

          <div className="flex items-center gap-2 bg-black/20 border border-white/5 rounded-full p-2 overflow-x-auto scrollbar-hide">

            {navItems.map((item) => (
              <DesktopNavLink
                key={item.path}
                item={item}
              />
            ))}

          </div>

          {/* AUTH */}

          {token ? (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white border border-red-500/20 px-5 py-3 rounded-2xl transition-all duration-300"
            >
              <LogOut size={18} />
              Logout
            </button>
          ) : (
            <button
              onClick={() =>
                navigate("/auth")
              }
              className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 hover:opacity-90 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg shadow-indigo-500/30 transition-all duration-300"
            >
              <LogIn size={18} />
              Login
            </button>
          )}
        </div>
      </div>

      {/* MOBILE */}

      <div className="md:hidden fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[94%]">

        <div className="backdrop-blur-3xl bg-white/[0.06] border border-white/10 rounded-2xl px-5 py-3 flex items-center justify-between shadow-2xl">

          <div
            onClick={() => navigate("/home")}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Sparkles
                size={15}
                className="text-white"
              />
            </div>

            <h1 className="text-xl font-black bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              StacX
            </h1>
          </div>

          <button
            onClick={() =>
              setMobileOpen(!mobileOpen)
            }
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
              mobileOpen
                ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
                : "bg-white/5 text-gray-300 hover:bg-white/10"
            }`}
          >
            {mobileOpen ? (
              <X size={20} />
            ) : (
              <Menu size={20} />
            )}
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER */}

      <div
        className={`md:hidden fixed inset-0 z-[60] transition-all duration-500 ${
          mobileOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible"
        }`}
      >

        <div
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={() =>
            setMobileOpen(false)
          }
        />

        <div
          className={`absolute top-0 right-0 w-[80%] max-w-[320px] h-full bg-[#0a0a0f] border-l border-white/10 backdrop-blur-3xl flex flex-col transition-transform duration-500 ease-out ${
            mobileOpen
              ? "translate-x-0"
              : "translate-x-full"
          }`}
        >

          <div className="px-5 pt-6 pb-4 border-b border-white/5 flex items-center gap-3">

            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-500 flex items-center justify-center">
              <Sparkles
                size={16}
                className="text-white"
              />
            </div>

            <div>
              <h2 className="text-lg font-black bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                StacX
              </h2>

              <p className="text-[10px] text-gray-500 -mt-0.5">
                Smart Notes Platform
              </p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-5 flex flex-col gap-1.5 scrollbar-hide">

            {navItems.map((item) => (
              <MobileNavLink
                key={item.path}
                item={item}
              />
            ))}

          </div>

          <div className="px-4 pb-6 pt-2 border-t border-white/5">

            {token ? (
              <button
                onClick={handleLogout}
                className="w-full bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white border border-red-500/20 py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-300"
              >
                <LogOut size={18} />
                Logout
              </button>
            ) : (
              <button
                onClick={() => {
                  setMobileOpen(false);

                  navigate("/auth");
                }}
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:opacity-90 text-white py-3 rounded-xl font-semibold shadow-lg shadow-indigo-500/30 flex items-center justify-center gap-2 transition-all duration-300"
              >
                <LogIn size={18} />
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}