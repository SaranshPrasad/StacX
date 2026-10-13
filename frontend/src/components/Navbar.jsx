
// import { useState } from "react";

// import {
//   Home,
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

// import {
//   NavLink,
//   useNavigate,
// } from "react-router-dom";

// export default function Navbar() {

//   const token =
//     localStorage.getItem("token");

//   const navigate = useNavigate();

//   const [mobileOpen, setMobileOpen] =
//     useState(false);

//   const handleLogout = () => {

//     localStorage.removeItem("token");

//     localStorage.removeItem("user");

//     navigate("/auth");
//   };

  

//   const navItems = [
//     {
//       path: "/home",
//       label: "Home",
//       icon: <Home size={18} />,
//     },

//     // {
//     //   path: "/home/chat",
//     //   label: "Chat",
//     //   icon: <MessageCircle size={18} />,
//     // },

//     {
//       path: "/home/resources",
//       label: "Resources",
//       icon: <FolderOpen size={18} />,
//     },

//     {
//       path: "/home/myrequests",
//       label: "My Requests",
//       icon: <ClipboardList size={18} />,
//     },

//     {
//       path: "/home/notifications",
//       label: "Notifications",
//       icon: <BadgeCheck size={18} />,
//     },

//     {
//       path: "/home/profile",
//       label: "Profile",
//       icon: <User size={18} />,
//     },
//   ];

// const DesktopNavLink = ({ item }) => (
//   <NavLink
//     to={item.path}
//     end={item.path === "/home"}
//     className={({ isActive }) =>
//       `flex items-center gap-3 px-5 py-3 rounded-full whitespace-nowrap font-medium transition-all duration-300 
//       ${
//         isActive
//           ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/30"
//           : "text-gray-400 hover:text-white hover:bg-white/5"
//       }`
//     }
//   >
//     {item.icon}
//     {item.label}
//   </NavLink>
// );

//  const MobileNavLink = ({ item }) => (
//   <NavLink
//     to={item.path}
//     end={item.path === "/home"}
//     onClick={() => setMobileOpen(false)}
//     className={({ isActive }) =>
//       `flex items-center gap-3 w-full px-5 py-3 rounded-2xl font-medium transition-all duration-300 ${
//         isActive
//           ? "bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-indigo-400 border border-indigo-500/20"
//           : "text-gray-400 hover:text-white hover:bg-white/5"
//       }`
//     }
//   >
//     {item.icon}
//     {item.label}
//   </NavLink>
// );

//   return (
//     <>
//       {/* DESKTOP */}

//       <div className="hidden md:flex fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[97%] max-w-[1700px]">

//         <div className="w-full backdrop-blur-2xl bg-white/[0.04] border border-white/10 rounded-[28px] px-6 py-4 flex items-center justify-between shadow-[0_8px_40px_rgba(0,0,0,0.4)]">

//           {/* LOGO */}

//           <div
//             onClick={() => navigate("/home")}
//             className="flex items-center gap-3 cursor-pointer"
//           >
//             <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
//               <Sparkles
//                 size={18}
//                 className="text-white"
//               />
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

//           {/* NAV */}

//           <div className="flex items-center gap-2 bg-black/20 border border-white/5 rounded-full p-2 overflow-x-auto scrollbar-hide">

//             {navItems.map((item) => (
//               <DesktopNavLink
//                 key={item.path}
//                 item={item}
//               />
//             ))}

//           </div>

//           {/* AUTH */}

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
//               onClick={() =>
//                 navigate("/auth")
//               }
//               className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 hover:opacity-90 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg shadow-indigo-500/30 transition-all duration-300"
//             >
//               <LogIn size={18} />
//               Login
//             </button>
//           )}
//         </div>
//       </div>

//       {/* MOBILE */}

//       <div className="md:hidden fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[94%]">

//         <div className="backdrop-blur-3xl bg-white/[0.06] border border-white/10 rounded-2xl px-5 py-3 flex items-center justify-between shadow-2xl">

//           <div
//             onClick={() => navigate("/home")}
//             className="flex items-center gap-2 cursor-pointer"
//           >
//             <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
//               <Sparkles
//                 size={15}
//                 className="text-white"
//               />
//             </div>

//             <h1 className="text-xl font-black bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
//               StacX
//             </h1>
//           </div>

//           <button
//             onClick={() =>
//               setMobileOpen(!mobileOpen)
//             }
//             className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
//               mobileOpen
//                 ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
//                 : "bg-white/5 text-gray-300 hover:bg-white/10"
//             }`}
//           >
//             {mobileOpen ? (
//               <X size={20} />
//             ) : (
//               <Menu size={20} />
//             )}
//           </button>
//         </div>
//       </div>

//       {/* MOBILE DRAWER */}

//       <div
//         className={`md:hidden fixed inset-0 z-[60] transition-all duration-500 ${
//           mobileOpen
//             ? "opacity-100 visible"
//             : "opacity-0 invisible"
//         }`}
//       >

//         <div
//           className="absolute inset-0 bg-black/70 backdrop-blur-sm"
//           onClick={() =>
//             setMobileOpen(false)
//           }
//         />

//         <div
//           className={`absolute top-0 right-0 w-[80%] max-w-[320px] h-full bg-[#0a0a0f] border-l border-white/10 backdrop-blur-3xl flex flex-col transition-transform duration-500 ease-out ${
//             mobileOpen
//               ? "translate-x-0"
//               : "translate-x-full"
//           }`}
//         >

//           <div className="px-5 pt-6 pb-4 border-b border-white/5 flex items-center gap-3">

//             <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-500 flex items-center justify-center">
//               <Sparkles
//                 size={16}
//                 className="text-white"
//               />
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

//           <div className="flex-1 overflow-y-auto px-4 py-5 flex flex-col gap-1.5 scrollbar-hide">

//             {navItems.map((item) => (
//               <MobileNavLink
//                 key={item.path}
//                 item={item}
//               />
//             ))}

//           </div>

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

//                   navigate("/auth");
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


import { useState } from "react";
import {
  Home,
  User,
  LogOut,
  LogIn,
  Sparkles,
  FolderOpen,
  ClipboardList,
  BadgeCheck,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setMobileOpen(false);
    navigate("/auth");
  };

  const navItems = [
    {
      path: "/home",
      label: "Home",
      icon: Home,
    },
    {
      path: "/home/resources",
      label: "Resources",
      icon: FolderOpen,
    },
    {
      path: "/home/myrequests",
      label: "My Requests",
      icon: ClipboardList,
    },
    {
      path: "/home/notifications",
      label: "Notifications",
      icon: BadgeCheck,
    },
    {
      path: "/home/profile",
      label: "Profile",
      icon: User,
    },
  ];

  const DesktopNavLink = ({ item }) => {
    const Icon = item.icon;

    return (
      <NavLink
        to={item.path}
        end={item.path === "/home"}
        className={({ isActive }) =>
          `flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
            isActive
              ? "bg-blue-600 text-white shadow-sm shadow-blue-600/20"
              : "text-slate-600 hover:bg-blue-50 hover:text-blue-700"
          }`
        }
      >
        <Icon size={17} strokeWidth={1.9} />
        {item.label}
      </NavLink>
    );
  };

  const MobileNavLink = ({ item }) => {
    const Icon = item.icon;

    return (
      <NavLink
        to={item.path}
        end={item.path === "/home"}
        onClick={() => setMobileOpen(false)}
        className={({ isActive }) =>
          `flex w-full items-center justify-between rounded-xl px-4 py-3 transition-colors ${
            isActive
              ? "bg-blue-50 text-blue-700 ring-1 ring-blue-100"
              : "text-slate-600 hover:bg-slate-50 hover:text-blue-700"
          }`
        }
      >
        <span className="flex items-center gap-3 text-sm font-medium">
          <Icon size={19} strokeWidth={1.9} />
          {item.label}
        </span>

        <ChevronRight size={16} className="text-slate-400" />
      </NavLink>
    );
  };

  return (
    <>
      {/* DESKTOP NAVBAR */}
      <header className="fixed inset-x-0 top-0 z-50 hidden px-5 pt-4 md:block">
        <nav className="mx-auto flex w-full max-w-[1600px] items-center justify-between gap-5 rounded-2xl border border-blue-100/80 bg-white/95 px-5 py-3 shadow-[0_4px_24px_rgba(37,99,235,0.06)] backdrop-blur-xl lg:px-7">
          {/* BRAND */}
          <button
            type="button"
            onClick={() => navigate("/home")}
            className="flex shrink-0 items-center gap-3 text-left"
            aria-label="Go to StacX home"
          >
            <div className="flex h-10 w-10 items-center justify-center  text-white  ">
              <img src="/stacxlogo.png" alt="" />
            </div>

            <div>
              <h1 className="text-xl font-extrabold tracking-tight text-slate-900">
                Stac<span className="text-blue-600">X</span>
              </h1>
              <p className="mt-0.5 text-[10px] font-medium tracking-wide text-slate-500">
                STUDENT RESOURCE HUB
              </p>
            </div>
          </button>

          {/* NAVIGATION */}
          <div className="flex min-w-0 items-center gap-1 overflow-x-auto rounded-2xl bg-slate-50 p-1.5">
            {navItems.map((item) => (
              <DesktopNavLink key={item.path} item={item} />
            ))}
          </div>

          {/* AUTH ACTION */}
          {token ? (
            <button
              type="button"
              onClick={handleLogout}
              className="flex shrink-0 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600"
            >
              <LogOut size={17} />
              Logout
            </button>
          ) : (
            <button
              type="button"
              onClick={() => navigate("/auth")}
              className="flex shrink-0 items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-blue-600/20 transition-colors hover:bg-blue-700"
            >
              <LogIn size={17} />
              Login
            </button>
          )}
        </nav>
      </header>

      {/* MOBILE NAVBAR */}
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:hidden">
        <nav className="flex items-center justify-between rounded-2xl border border-blue-100 bg-white/95 px-4 py-3 shadow-[0_4px_20px_rgba(37,99,235,0.08)] backdrop-blur-xl">
          <button
            type="button"
            onClick={() => navigate("/home")}
            className="flex items-center gap-2.5 text-left"
            aria-label="Go to StacX home"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white">
              <Sparkles size={17} />
            </div>

            <div>
              <h1 className="text-lg font-extrabold tracking-tight text-slate-900">
                Stac<span className="text-blue-600">X</span>
              </h1>
              <p className="-mt-0.5 text-[10px] text-slate-500">
                Student Resource Hub
              </p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-colors ${
              mobileOpen
                ? "border-blue-200 bg-blue-50 text-blue-700"
                : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
            }`}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </header>

      {/* MOBILE DRAWER */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={() => setMobileOpen(false)}
            className="absolute inset-0 bg-slate-900/25 backdrop-blur-[2px]"
          />

          <aside className="absolute bottom-0 right-0 top-0 flex w-[82%] max-w-[340px] flex-col border-l border-blue-100 bg-white shadow-2xl">
            {/* DRAWER HEADER */}
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
                  <Sparkles size={18} />
                </div>

                <div>
                  <h2 className="font-extrabold text-slate-900">
                    Stac<span className="text-blue-600">X</span>
                  </h2>
                  <p className="text-xs text-slate-500">
                    Student Resource Hub
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                aria-label="Close menu"
              >
                <X size={19} />
              </button>
            </div>

            {/* DRAWER LINKS */}
            <div className="flex-1 space-y-1.5 overflow-y-auto px-4 py-5">
              <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
                Workspace
              </p>

              {navItems.map((item) => (
                <MobileNavLink key={item.path} item={item} />
              ))}
            </div>

            {/* DRAWER FOOTER */}
            <div className="border-t border-slate-100 p-4">
              {token ? (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-100 bg-red-50 py-3 text-sm font-semibold text-red-600 transition-colors hover:bg-red-100"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    navigate("/auth");
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
                >
                  <LogIn size={18} />
                  Login
                </button>
              )}
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
