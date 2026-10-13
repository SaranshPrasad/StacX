// src/components/LoginToView.jsx

import { Lock, LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function LoginToView({ title = "Login Required" }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6 transition-colors duration-200">
      <div className="max-w-md w-full bg-white border border-slate-200/80 rounded-3xl p-8 text-center shadow-sm">
        
        <div className="w-20 h-20 mx-auto rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center mb-6 shadow-inner">
          <Lock className="text-indigo-600 stroke-[2]" size={36} />
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-3">
          {title}
        </h1>

        <p className="text-slate-500 mb-8 text-sm sm:text-base leading-relaxed">
          You need to be logged in to view and interact with this page.
        </p>

        <button
          onClick={() => navigate("/auth")}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all text-white font-semibold flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20 transform hover:-translate-y-0.5"
        >
          <LogIn size={18} />
          Login Now
        </button>
      </div>
    </div>
  );
}