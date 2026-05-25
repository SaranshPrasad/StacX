import {
  Home,
  Bell,
  MessageCircle,
  User,
  Plus,
} from "lucide-react";

export default function MobileNavbar({
  activeTab,
  setActiveTab,
  setShowRequestModal,
}) {
  return (
    <div className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[95%]">
      <div className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-full px-4 py-3 flex justify-around items-center shadow-2xl">

        <button
          onClick={() => setActiveTab("home")}
          className={`flex flex-col items-center text-xs ${
            activeTab === "home"
              ? "text-indigo-400"
              : "text-gray-400"
          }`}
        >
          <Home size={20} />
          Home
        </button>

        <button
          onClick={() => setActiveTab("chat")}
          className={`flex flex-col items-center text-xs ${
            activeTab === "chat"
              ? "text-indigo-400"
              : "text-gray-400"
          }`}
        >
          <MessageCircle size={20} />
          Chat
        </button>

        <button
          onClick={() => setShowRequestModal(true)}
          className="bg-indigo-500 p-4 rounded-full -mt-10 shadow-xl"
        >
          <Plus />
        </button>

        <button
          onClick={() => setActiveTab("notifications")}
          className={`flex flex-col items-center text-xs ${
            activeTab === "notifications"
              ? "text-indigo-400"
              : "text-gray-400"
          }`}
        >
          <Bell size={20} />
          Alerts
        </button>

        <button
          onClick={() => setActiveTab("profile")}
          className={`flex flex-col items-center text-xs ${
            activeTab === "profile"
              ? "text-indigo-400"
              : "text-gray-400"
          }`}
        >
          <User size={20} />
          Profile
        </button>
      </div>
    </div>
  );
}