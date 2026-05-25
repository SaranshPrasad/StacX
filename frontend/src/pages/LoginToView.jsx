// src/components/LoginToView.jsx

import { Lock, LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function LoginToView({ title = "Login Required" }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0a0e1a] flex items-center justify-center px-6">
      <div className="max-w-md w-full bg-white/5 border border-white/10 rounded-3xl p-8 text-center backdrop-blur-xl">
        
        <div className="w-20 h-20 mx-auto rounded-full bg-indigo-500/20 flex items-center justify-center mb-6">
          <Lock className="text-indigo-400" size={38} />
        </div>

        <h1 className="text-3xl font-bold text-white mb-3">
          {title}
        </h1>

        <p className="text-gray-400 mb-8">
          You need to login first to access this page.
        </p>

        <button
          onClick={() => navigate("/auth")}
          className="w-full py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 transition-all text-white font-semibold flex items-center justify-center gap-2"
        >
          <LogIn size={20} />
          Login Now
        </button>
      </div>
    </div>
  );
}